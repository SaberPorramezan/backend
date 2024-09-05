const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const CreditCardService = require("../../services/creditCard.service");
const messages = require("../../../configs/messages");

class CreditCardController extends Controller {
  addCreditCard = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cardInfo = req.body;

    const card = await CreditCardService.addCreditCard(userId, cardInfo);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      card,
      message: messages.success.creditCard.creditCardAdded,
    });
  });
}

module.exports = new CreditCardController();
