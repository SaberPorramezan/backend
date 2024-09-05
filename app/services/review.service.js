const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const { ReviewModel } = require("../models/review.model");
const ProductService = require("../services/product.service");
const messages = require("../../configs/messages");

class ReviewService {
  static async addReview(reviewData, userId) {
    const { productId } = reviewData;

    await ProductService.isProductExistsById(productId);

    const hasReviewed = await this.hasUserReviewed(productId, userId);
    if (hasReviewed)
      throw createHttpError.BadRequest(messages.errors.review.alreadyReviewed);

    await ReviewModel.create({
      ...reviewData,
      user: userId,
      product: productId,
    });
  }
  static async likeReview(reviewId, userId) {
    if (!mongoose.Types.ObjectId.isValid(reviewId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    const review = await this.findReviewById(reviewId);
    let message = "";

    if (review.reactions.likes.includes(userId)) {
      review.reactions.likes.pull(userId);
      review.reactions.likeCount--;
      message = messages.success.review.reactionRemoved;
    } else {
      if (review.reactions.dislikes.includes(userId)) {
        review.reactions.dislikes.pull(userId);
        review.reactions.dislikeCount--;
      }
      review.reactions.likes.push(userId);
      review.reactions.likeCount++;
      message = messages.success.review.reviewLiked;
    }

    await review.save();
    return message;
  }
  static async dislikeReview(reviewId, userId) {
    if (!mongoose.Types.ObjectId.isValid(reviewId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    const review = await this.findReviewById(reviewId);
    let message = "";

    if (review.reactions.dislikes.includes(userId)) {
      review.reactions.dislikes.pull(userId);
      review.reactions.dislikeCount--;
      message = messages.success.review.reactionRemoved;
    } else {
      if (review.reactions.likes.includes(userId)) {
        review.reactions.likes.pull(userId);
        review.reactions.likeCount--;
      }
      review.reactions.dislikes.push(userId);
      review.reactions.dislikeCount++;
      message = messages.success.review.reviewDisliked;
    }

    await review.save();
    return message;
  }

  // Utility Methods
  static async findReviewById(reviewId) {
    const review = await ReviewModel.findById(reviewId);
    if (!review)
      throw createHttpError.NotFound(messages.errors.review.reviewNotFound);

    return review;
  }
  static async hasUserReviewed(productId, userId) {
    const isExistingReview = await ReviewModel.findOne({
      product: productId,
      user: userId,
    });

    return !!isExistingReview;
  }
}

module.exports = ReviewService;
