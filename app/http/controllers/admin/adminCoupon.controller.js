const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("../controller");
const AdminCouponService = require("../../../services/admin/adminCoupon.service");
const messages = require("../../../../configs/messages");

class AdminCouponController extends Controller {
  createCoupon = asyncHandler(async (req, res) => {
    const couponData = req.body;

    const coupon = await AdminCouponService.createCoupon(couponData);

    res.status(HttpStatus.CREATED).json({
      coupon,
      message: messages.success.coupon.couponCreated,
    });
  });
}

module.exports = new AdminCouponController();
