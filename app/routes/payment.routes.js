const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const PaymentController = require("../http/controllers/payment.controller");
const validate = require("../../app/http/middlewares/validation.middleware");
const { createPaymentSchema } = require("../http/validators/payment.schema");

const router = express.Router();

router.post(
  "/create",
  validate(createPaymentSchema),
  expressAsyncHandler(PaymentController.createPayment)
);

module.exports = {
  paymentRoutes: router,
};
