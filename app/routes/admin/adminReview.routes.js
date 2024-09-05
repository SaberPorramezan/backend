const expressAsyncHandler = require("express-async-handler");
const AdminReviewController = require("../../http/controllers/admin/adminReview.controller");

const router = require("express").Router();

router.patch(
  "/approve/:id",
  expressAsyncHandler(AdminReviewController.approveReview)
);
router.patch(
  "/reject/:id",
  expressAsyncHandler(AdminReviewController.rejectReview)
);

module.exports = {
  adminReviewRoutes: router,
};
