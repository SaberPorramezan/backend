const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const PaymentService = require("../../services/payment.service");
const messages = require("../../../configs/messages");

class PaymentController extends Controller {
  createPayment = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const paymentDetails = req.body;

    const payment = await PaymentService.createPayment(userId, paymentDetails);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      payment,
      message: messages.success.payment.paymentCreated,
    });
  });
}

module.exports = new PaymentController();
