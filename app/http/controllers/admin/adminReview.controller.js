const { StatusCodes: HttpStatus } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const Controller = require("../controller");
const AdminReviewService = require("../../../services/admin/adminReview.service");
const messages = require("../../../../configs/messages");

class AdminReviewController extends Controller {
  approveReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;

    await AdminReviewService.approveReview(reviewId);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.review.reviewApproved,
    });
  });
  rejectReview = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;

    await AdminReviewService.rejectReview(reviewId);

    this.sendSuccessResponse(res, HttpStatus.OK, {
      message: messages.success.review.reviewRejected,
    });
  });
}

module.exports = new AdminReviewController();
