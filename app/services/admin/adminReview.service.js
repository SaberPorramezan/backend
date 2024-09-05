const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const ReviewService = require("../review.service");
const ProductService = require("../product.service");
const { REVIEW_STATUS } = require("../../../configs/constants");
const messages = require("../../../configs/messages");

class AdminReviewService extends ReviewService {
  static async approveReview(reviewId) {
    if (!mongoose.Types.ObjectId.isValid(reviewId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    const review = await this.findReviewById(reviewId);
    if (review.status === REVIEW_STATUS.APPROVED)
      throw createHttpError.Conflict(
        messages.errors.review.reviewAlreadyApproved
      );

    review.status = REVIEW_STATUS.APPROVED;
    await review.save();

    await ProductService.updateProductRating(review.product);
  }
  static async rejectReview(reviewId) {
    if (!mongoose.Types.ObjectId.isValid(reviewId))
      throw createHttpError.BadRequest(messages.errors.general.invalidId);

    const review = await this.findReviewById(reviewId);
    if (review.status === REVIEW_STATUS.REJECTED)
      throw createHttpError.Conflict(
        messages.errors.review.reviewAlreadyRejected
      );

    review.status = REVIEW_STATUS.REJECTED;
    await review.save();

    await ProductService.updateProductRating(review.product);
  }
}

module.exports = AdminReviewService;
