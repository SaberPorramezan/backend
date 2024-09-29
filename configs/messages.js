module.exports = {
  errors: {
    // General Errors
    general: {
      serverError:
        "An unexpected error occurred on our server. Please try again later or contact support if the problem persists.", // Used: token.util
      badRequest: "Your request could not be processed. Please try again.", // Used: errorHandler.middleware
      unauthorized: "You are not authorized to access this resource.",
      forbidden: "You are not allowed to make this request.", // Used: permission.guard
      notFound: "No API route found.", // Used: errorHandler.middleware
      conflict:
        "There is a conflict with your request. Please check and try again.", // Used: errorHandler.middleware, adminReview.service
      internalServerError:
        "An internal server error occurred. Please try again later.", // Used: errorHandler.middleware
      badGateway:
        "The server received an invalid response from the upstream server.",
      serviceUnavailable:
        "The service is currently unavailable. Please try again later.",
      gatewayTimeout:
        "The server took too long to respond. Please try again later.",

      invalidId: "Invalid ID", // Used: adminReview.service, brand.service, cart.service, category.service, product.service, review.service, shippingMethod.service
    },

    // Authentication Errors
    auth: {
      userExists: "That email address is already in use.", // Used: auth.service
      userNotFound: "User not found.", // Used: auth.service, passport.config
      invalidPassword: "Password Incorrect.", // Used: auth.service, passport.config
      tokenMissing: "Authentication token missing.", // Used: cookie.utils
      invalidToken: "Invalid token.", // Used: cookie.utils
    },

    // Category Errors
    category: {
      categoryNotFound: "Category not found.", // Used: category.service
      categoryExists: "A similar category already exists.", // Used: category.service
    },

    // Brand Errors
    brand: {
      brandNotFound: "Brand not found.", // Used: brand.service
      brandExists: "A similar brand already exists.", // Used: brand.service
    },

    // Address Errors
    address: {
      addressNotFound: "Address not found.", // Used: address.service
      duplicateAddress: "This address is already registered.", // Used: address.service
      addressNotFoundOrUnauthorized:
        "Address not found or you are not authorized to access this address.", // Used: address.service
    },

    // Credit Card Errors
    creditCard: {
      creditCardExists: "This credit card is already added.", // Used: creditCard.service
      creditCardNotFoundOrUnauthorized:
        "Credit card not found or you are not authorized to access this credit card.", // Used: creditCard.service
    },

    // Product Errors
    product: {
      productNotFound: "Product not found.", // Used: product.service
      productExists: "A similar product already exists.", // Used: product.service
      productNotActive: "Product not active.", // Used: product.service
      invalidProductQuantity: "Invalid product quantity", // Used: product.service
    },

    // Review Errors
    review: {
      reviewNotFound: "Review not found.", // Used: review.service
      alreadyReviewed: "You have already reviewed this product.", // Used: review.service
      reviewAlreadyApproved: "This review has already been approved.", // Used: adminReview.service
      reviewAlreadyRejected: "This review has already been rejected.", // Used: adminReview.service
    },

    // Shipping Method Errors
    shippingMethod: {
      shippingMethodNotFound: "Shipping method not found.", // Used: shippingMethod.service
      shippingMethodExists: "A similar shipping method already exists.", // Used: shippingMethod.service
    },

    // Coupon Errors
    coupon: {
      duplicateCoupon:
        "A coupon code with the same code and valid time period already exists.", // Used: adminCoupon.service
      invalidCoupon: "Invalid or expired coupon code.", // Used: coupon.service
      couponUsageLimitReached: "Coupon usage limit reached.", // Used: coupon.service
      minimumPurchaseAmountNotMet:
        "Minimum purchase amount not met for the coupon.", // Used: coupon.service
    },

    // Cart Errors
    cart: {
      productNotInCart: "Product not in the cart.", // Used: cart.service
      cartAlreadyEmpty: "Cart is already empty.", // Used: cart.service, order.service
      selectedColorRequired: "Selected color is required.", // Used: cart.service
    },

    // Order Errors
    order: {
      orderNotFound: "Order not found.", // Used: order.service
    },

    // Payment Errors
    payment: {
      paymentAlreadyProcessed:
        "Payment has already been processed successfully for this order.", // Used: payment.service
      paymentFailed: "Payment failed. Please try again.", // Used: payment.service
      paymentNotFound: "Payment not found.", // Used: payment.service
    },

    // Wishlist Errors
    wishlist: {
      productAlreadyInWishlist: "Product is already in your wishlist.", // Used: wishlist.service
      productNotFoundInWishlist: "Product not found in your wishlist.", // Used: wishlist.service
    },
  },
  success: {
    // Auth Success
    auth: {
      register: "Registered successfully.", // Used: auth.controller
      login: "Login successful.", // Used: auth.controller
      tokenRefreshed: "Token refreshed successfully.", // Used: auth.controller
      logout: "Logout successful.", // Used: auth.controller
    },

    // Category Success
    category: {
      categoryAdded: "Category added successfully.", // Used: adminCategory.controller
      categoryUpdated: "Category updated successfully.", // Used: adminCategory.controller
      categoryRemoved: "Category removed successfully.", // Used: adminCategory.controller
    },

    // Brand Success
    brand: {
      brandAdded: "Brand added successfully.", // Used: adminBrand.controller
      brandUpdated: "Brand updated successfully.", // Used: adminBrand.controller
      brandRemoved: "Brand removed successfully.", // Used: adminBrand.controller
    },

    // Address Success
    address: {
      addressAdded: "The address has been successfully added.", // Used: address.controller
      addressUpdated: "Address updated successfully.", // Used: address.controller
    },

    // Credit Card Success
    creditCard: {
      creditCardAdded: "Credit card added successfully.", // Used: creditCard.controller
    },

    // Product Success
    product: {
      productAdded: "Product added successfully.", // Used: adminProduct.controller
    },

    // Review Success
    review: {
      reviewAdded:
        "Your review has been added successfully and will appear when approved!", // Used: review.controller
      reviewLiked: "You have liked the review successfully.", // Used: review.service
      reviewDisliked: "You have disliked the review successfully.", // Used: review.service
      reactionRemoved: "Your reaction has been removed successfully.", // Used: review.service
      reviewApproved: "The review has been approved successfully.", // Used: adminReview.controller
      reviewRejected: "The review has been rejected successfully.", // Used: adminReview.controller
    },

    // Shipping Method Success
    shippingMethod: {
      shippingMethodAdded: "Shipping method added successfully.", // Used: adminShippingMethod.controller
    },

    // Coupon Success
    coupon: {
      couponCreated: "Coupon code created successfully.", // Used: adminCoupon.controller
    },

    // Cart Success
    cart: {
      addedToCart: "Product added to cart successfully", // Used: cart.controller
      updatedCartItem: "Cart item updated successfully", // Used: cart.controller
      couponAppliedToCart: "Coupon applied successfully.", // Used: cart.controller
      removedFromCart: "Product removed from cart successfully", // Used: cart.controller
      cartCleared: "Cart cleared successfully", // Used: cart.controller
    },

    // Order Success
    order: {
      orderCreated: "Order created successfully.", // Used: order.controller
    },

    // Payment Success
    payment: {
      paymentCreated: "Payment created successfully.", // Used: payment.controller
    },

    // Wishlist Success
    wishlist: {
      addedToWishlist: "Product has been successfully added to your wishlist.", // Used: wishlist.controller
      removedFromWishlist:
        "Product has been successfully removed from your wishlist!", // Used: wishlist.controller
    },
  },
  joi: {
    // Errors related to string validation
    string: (field) => ({
      "string.base": `${field} should be of type 'string'.`,
      "string.empty": `${field} cannot be empty.`,
      "string.min": `${field} should be at least {#limit} characters.`,
      "string.max": `${field} should be at most {#limit} characters.`,
      "string.pattern.base": `${field} should match the required pattern.`,
      "string.uri": `${field} should be a valid URI.`,
      "string.isoDate": `${field} must be in ISO 8601 format (e.g., 2024-01-01T09:52:39.009Z)`,
      "string.creditCard": `${field} must be a valid 'credit card'`,
      "string.email": `${field} must be a valid 'email'`,
      "any.required": `${field} is required.`,
    }),

    // Errors related to number validation
    number: (field) => ({
      "number.base": `${field} should be of type 'number'.`,
      "number.integer": `${field} should be an integer.`,
      "number.min": `${field} should be at least {#limit}.`,
      "number.max": `${field} should be at most {#limit}.`,
      "number.precision": `${field} must have at most {#limit} decimal place`,
      "any.required": `${field} is required.`,
    }),

    // Errors related to array validation
    array: (field) => ({
      "array.base": `${field} should be an 'array'.`,
      "array.min": `At least {#limit} ${field} are required.`,
      "array.max": `The number of ${field} should not exceed {#limit}.`,
      "any.required": `${field} is required.`,
    }),

    // Errors related to object validation
    object: (field) => ({
      "object.base": `${field} should be an 'object'.`,
      "any.required": `${field} is required.`,
    }),

    // Errors related to boolean validation
    boolean: (field) => ({
      "boolean.base": `${field} must be a 'boolean' value`,
      "any.required": `${field} is required`,
    }),

    // Errors related to specific value validation
    anyOnly: (field, values) => ({
      "any.only": `${field} must be one of [${values.join(", ")}].`,
    }),

    // Errors related to forbidden fields
    forbidden: (field) => ({
      "any.unknown": `${field} is not allowed.`,
    }),
  },
};
