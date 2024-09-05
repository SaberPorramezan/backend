module.exports = {
  MongoIDPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
  PasswordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/i,
  HexCodePattern: /^#[0-9A-Fa-f]{6}$/,
  IconPattern: /\.svg$/i,
  ImagePattern: /\.(jpg|jpeg|png|webp)$/i,
  VideoPattern: /\.mp4$/i,
  CardExpiryDatePattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
  CardCvvPattern: /^[0-9]{3,4}$/,
  PhoneNumberPattern: /^\+?[1-9]\d{1,14}$/,

  ROLES: Object.freeze({
    CUSTOMER: "CUSTOMER",
    ADMIN: "ADMIN",
    SELLER: "SELLER",
    SUPPORT: "SUPPORT",
    GUEST: "GUEST",
  }),
  CARD_TYPES: Object.freeze([
    { type: "VISA", pattern: /^4[0-9]{12}(?:[0-9]{3})?$/ },
    { type: "MASTERCARD", pattern: /^5[1-5][0-9]{14}$/ },
    { type: "AMERICAN_EXPRESS", pattern: /^3[47][0-9]{13}$/ },
  ]),
  REVIEW_STATUS: Object.freeze({
    WAITING_APPROVAL: "WAITING_APPROVAL",
    REJECTED: "REJECTED",
    APPROVED: "APPROVED",
  }),
  COUPON_TYPES: Object.freeze({
    PERCENTAGE: "PERCENTAGE",
    FIXED: "FIXED",
  }),
  ORDER_STATUS: Object.freeze({
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
    RETURNED: "RETURNED",
  }),
  PAYMENT_STATUS: Object.freeze({
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    REFUNDED: "REFUNDED",
  }),
  PAYMENT_METHODS: Object.freeze({
    CREDIT_CARD: "CREDIT_CARD",
    PAYPAL: "PAYPAL",
    CASH_ON_DELIVERY: "CASH_ON_DELIVERY",
  }),
};
