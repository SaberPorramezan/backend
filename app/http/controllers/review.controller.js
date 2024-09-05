const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("./controller");
const ReviewService = require("../../services/review.service");
const messages = require("../../../configs/messages");

class ReviewController extends Controller {
  addReview = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    await ReviewService.addReview(req.body, userId);

    this.sendSuccessResponse(res, HttpStatus.CREATED, {
      message: messages.success.review.reviewAdded,
    });
  });
  likeReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const message = await ReviewService.likeReview(reviewId, userId);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message,
    });
  });
  dislikeReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const message = await ReviewService.dislikeReview(reviewId, userId);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message,
    });
  });
}

module.exports = new ReviewController();
