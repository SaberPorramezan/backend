const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const { CreditCardModel } = require("../models/creditCard.model");
const { CARD_TYPES } = require("../../configs/constants");
const messages = require("../../configs/messages");

class CreditCardService {
  static async addCreditCard(userId, cardInfo) {
    const { cardNumber } = cardInfo;

    await this.isCreditCardExists(userId, cardNumber);

    const creditCard = await CreditCardModel.create({
      ...cardInfo,
      user: userId,
      cardType: this.getCardType(cardNumber),
    });

    return creditCard;
  }

  // Utility methods
  static async isCreditCardExists(userId, cardNumber) {
    const isExistingCard = await CreditCardModel.exists({
      user: userId,
      cardNumber: cardNumber,
    });
    if (isExistingCard)
      throw createHttpError.Conflict(
        messages.errors.creditCard.creditCardExists
      );

    return isExistingCard;
  }
  static async isCreditCardOwnedByUser(userId, creditCardId) {
    const creditCardExists = await CreditCardModel.exists({
      _id: creditCardId,
      user: userId,
    });

    if (!creditCardExists)
      throw createHttpError.Forbidden(
        messages.errors.creditCard.creditCardNotFoundOrUnauthorized
      );

    return creditCardExists;
  }
  static getCardType(cardNumber) {
    for (const { type, pattern } of CARD_TYPES) {
      if (pattern.test(cardNumber)) {
        return type;
      }
    }

    return null;
  }
}

module.exports = CreditCardService;
