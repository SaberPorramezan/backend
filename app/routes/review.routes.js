const expressAsyncHandler = require("express-async-handler");
const { addReviewSchema } = require("../http/validators/review.schema");
const validate = require("../http/middlewares/validation.middleware");
const ReviewController = require("../http/controllers/review.controller");

const router = require("express").Router();

router.post(
  "/add",
  validate(addReviewSchema),
  expressAsyncHandler(ReviewController.addReview)
);
router.patch("/like/:id", expressAsyncHandler(ReviewController.likeReview));
router.patch(
  "/dislike/:id",
  expressAsyncHandler(ReviewController.dislikeReview)
);

module.exports = {
  reviewRoutes: router,
};
