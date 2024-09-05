const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const OrderService = require("../../services/order.service");
const messages = require("../../../configs/messages");

class OrderController extends Controller {
  createOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const orderDetails = req.body;

    const order = await OrderService.createOrder(userId, orderDetails);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      order,
      message: messages.success.order.orderCreated,
    });
  });
}

module.exports = new OrderController();
