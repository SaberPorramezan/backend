const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const { CouponModel } = require("../models/coupon.model");
const { COUPON_TYPES } = require("../../configs/constants");
const messages = require("../../configs/messages");

class CouponService {
  static async processCoupon(couponIdentifier, price) {
    const couponDetails = await this.findCoupon(couponIdentifier);

    this.checkCouponValidity(couponDetails, price);

    const couponDiscount = this.calculateCouponDiscount(couponDetails, price);

    return { couponDetails, couponDiscount };
  }

  // Utility methods
  static calculateCouponDiscount(coupon, price) {
    const { couponType, value } = coupon;
    let discount = 0;

    if (couponType === COUPON_TYPES.PERCENTAGE) {
      discount = (price * value) / 100;
    } else {
      discount = value;
    }

    return Math.min(discount, price);
  }
  static async findCoupon(couponIdentifier) {
    if (mongoose.Types.ObjectId.isValid(couponIdentifier))
      return await CouponModel.findById(couponIdentifier);

    return await CouponModel.findOne({ code: couponIdentifier });
  }
  static checkCouponValidity(coupon, price) {
    const {
      isActive,
      expirationDate,
      usageLimit,
      usageCount,
      totalQuantity,
      minimumPurchaseAmount,
    } = coupon;

    if (!isActive || (expirationDate && expirationDate < new Date()))
      throw createHttpError.BadRequest(messages.errors.coupon.invalidCoupon);

    if (usageLimit <= usageCount)
      throw createHttpError.BadRequest(
        messages.errors.coupon.couponUsageLimitReached
      );

    if (totalQuantity && totalQuantity <= usageCount)
      throw createHttpError.BadRequest(
        messages.errors.coupon.couponUsageLimitReached
      );

    if (minimumPurchaseAmount > price)
      throw createHttpError.BadRequest(
        messages.errors.coupon.minimumPurchaseAmountNotMet
      );
  }
  static async isCouponDuplicate(code) {
    const existingCoupon = await CouponModel.findOne({
      code,
      expirationDate: { $gte: new Date() },
    });

    return !!existingCoupon;
  }
}

module.exports = CouponService;
