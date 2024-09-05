const expressAsyncHandler = require("express-async-handler");
const CreditCardController = require("../http/controllers/creditCard.controller");
const validate = require("../../app/http/middlewares/validation.middleware");
const { addCreditCardSchema } = require("../http/validators/creditCard.schema");

const router = require("express").Router();

router.post(
  "/add",
  validate(addCreditCardSchema),
  expressAsyncHandler(CreditCardController.addCreditCard)
);

module.exports = {
  creditCardRoutes: router,
};
