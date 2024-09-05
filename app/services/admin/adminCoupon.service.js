const createHttpError = require("http-errors");
const { CouponModel } = require("../../models/coupon.model");
const CouponService = require("../coupon.service");
const messages = require("../../../configs/messages");

class AdminCouponService extends CouponService {
  static async createCoupon(couponData) {
    const { code } = couponData;

    const couponExists = await this.isCouponDuplicate(code);
    if (couponExists)
      throw createHttpError.Conflict(messages.errors.coupon.duplicateCoupon);

    const coupon = await CouponModel.create(couponData);

    return coupon;
  }
}

module.exports = AdminCouponService;
