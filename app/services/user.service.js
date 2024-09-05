const { UserModel } = require("../models/user.model");
const { copyObject } = require("../../utils/utils");

class UserService {
  static async getUserProfile(userId) {
    const profile = await UserModel.aggregate([
      // Match the user based on userId
      {
        $match: {
          _id: userId,
        },
      },

      // Lookup the cart associated with the user
      {
        $lookup: {
          from: "carts",
          localField: "_id",
          foreignField: "user",
          as: "cart",
        },
      },

      // Unwind the cart array to get a single cart object
      {
        $unwind: {
          path: "$cart",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Lookup details for products in the user's cart
      {
        $lookup: {
          from: "products",
          localField: "cart.items.product",
          foreignField: "_id",
          as: "cartProductDetails",
        },
      },

      // Lookup the coupon associated with the cart
      {
        $lookup: {
          from: "coupons",
          localField: "cart.coupon",
          foreignField: "_id",
          as: "coupon",
        },
      },

      // Lookup payments made by the user
      {
        $lookup: {
          from: "payments",
          localField: "_id",
          foreignField: "user",
          as: "payments",
        },
      },

      // Lookup addresses associated with the user
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "user",
          as: "addresses",
        },
      },

      // Lookup credit cards associated with the user
      {
        $lookup: {
          from: "creditcards",
          localField: "_id",
          foreignField: "user",
          as: "creditCards",
        },
      },

      // Project the necessary fields: user details, cart, and product details
      {
        $project: {
          user: {
            _id: "$_id",
            fullName: "$fullName",
            email: "$email",
            isVerifiedEmail: "$isVerifiedEmail",
            phoneNumber: "$phoneNumber",
            isVerifiedPhoneNumber: "$isVerifiedPhoneNumber",
            role: "$role",
            biography: "$biography",
            avatarUrl: "$avatar",
            dateOfBirth: "$dateOfBirth",
            gender: "$gender",
            isActive: "$isActive",
            createdAt: "$createdAt",
            updatedAt: "$updatedAt",
            __v: "$__v",
          },
          cart: 1,
          cartProductDetails: {
            _id: 1,
            title: 1,
            slug: 1,
            images: 1,
            price: 1,
            discount: 1,
            offPrice: 1,
            quantity: 1,
            colors: 1,
            rating: 1,
            category: 1,
            brand: 1,
          },
          coupon: { $arrayElemAt: ["$coupon", 0] },
          payments: 1,
          addresses: 1,
          creditCards: 1,
        },
      },

      // Add quantity field to each product detail based on cart items
      {
        $addFields: {
          cartProductDetails: {
            $function: {
              body: function (cartProductDetails, items) {
                if (!cartProductDetails) return [];
                return cartProductDetails.map(function (product) {
                  const item = items.find(
                    (item) => item.product.valueOf() === product._id.valueOf()
                  );
                  if (!item) return product;
                  return {
                    product: product,
                    quantity: item.quantity,
                    selectedColor: item.selectedColor,
                  };
                });
              },
              args: ["$cartProductDetails", "$cart.items"],
              lang: "js",
            },
          },
        },
      },

      // Calculate discount details based on cart product details and coupon
      {
        $addFields: {
          discountDetail: {
            $function: {
              body: function (cartProductDetails, coupon) {
                let couponDiscount = 0;
                let finalPrice = cartProductDetails.reduce(
                  (acc, item) =>
                    acc +
                    (item.product.offPrice || item.product.price) *
                      item.quantity,
                  0
                );
                if (!coupon)
                  return {
                    cartProductDetails,
                    coupon: null,
                    finalPrice,
                    couponDiscount,
                  };
                const isExpiredCoupon =
                  coupon.expirationDate &&
                  new Date(coupon.expirationDate).getTime() < Date.now();
                const isReachedLimit = coupon.usageCount >= coupon.usageLimit;
                const isTotalQuantityExceeded =
                  coupon.totalQuantity &&
                  coupon.totalQuantity <= coupon.usageCount;
                const isMinimumPurchaseMet =
                  finalPrice < coupon.minimumPurchaseAmount;
                if (
                  !coupon.isActive ||
                  isReachedLimit ||
                  isExpiredCoupon ||
                  isTotalQuantityExceeded ||
                  isMinimumPurchaseMet
                )
                  return {
                    cartProductDetails,
                    coupon: null,
                    finalPrice,
                    couponDiscount,
                  };
                if (coupon.couponType === "PERCENTAGE") {
                  couponDiscount = finalPrice * (coupon.value / 100);
                  finalPrice = parseInt(finalPrice * (1 - coupon.value / 100));
                } else {
                  couponDiscount = coupon.value;
                  finalPrice = Math.max(0, finalPrice - coupon.value);
                }
                return {
                  cartProductDetails,
                  coupon: { _id: coupon._id, code: coupon.code },
                  finalPrice,
                  couponDiscount,
                };
              },
              args: ["$cartProductDetails", "$coupon"],
              lang: "js",
            },
          },
        },
      },

      // Calculate payment details based on cart product details, total price, and discounts
      {
        $addFields: {
          payDetail: {
            $function: {
              body: function (cartProductDetails, finalPrice, couponDiscount) {
                if (!cartProductDetails) return null;
                const totalPrice = cartProductDetails.reduce(
                  (total, product) => {
                    return (
                      total + parseInt(product.product.price * product.quantity)
                    );
                  },
                  0
                );
                const totalDiscount =
                  cartProductDetails.reduce((total, product) => {
                    return (
                      total +
                      parseInt(
                        (product.product.price -
                          (product.product.offPrice || product.product.price)) *
                          product.quantity
                      )
                    );
                  }, 0) + couponDiscount;
                const orderItems = cartProductDetails.map((product) => ({
                  product: product.product._id,
                  price: product.product.offPrice || product.product.price,
                  quantity: product.quantity,
                }));
                const productIds = cartProductDetails.map((product) =>
                  product.product._id.valueOf()
                );
                return {
                  productIds,
                  orderItems,
                  totalPrice,
                  totalDiscount,
                  finalPrice,
                };
              },
              args: [
                "$discountDetail.cartProductDetails",
                "$discountDetail.finalPrice",
                "$discountDetail.couponDiscount",
              ],
              lang: "js",
            },
          },
        },
      },

      // Lookup orders placed by the user with pipeline
      {
        $lookup: {
          from: "orders",
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$user", "$$userId"] } } },
            {
              $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "orderProductDetails",
              },
            },
            {
              $addFields: {
                items: {
                  $map: {
                    input: "$items",
                    as: "item",
                    in: {
                      product: {
                        $let: {
                          vars: {
                            product: {
                              $arrayElemAt: [
                                {
                                  $filter: {
                                    input: "$orderProductDetails",
                                    as: "opd",
                                    cond: {
                                      $eq: ["$$opd._id", "$$item.product"],
                                    },
                                  },
                                },
                                0,
                              ],
                            },
                          },
                          in: {
                            _id: "$$product._id",
                            title: "$$product.title",
                            slug: "$$product.slug",
                            images: "$$product.images",
                            price: "$$product.price",
                            discount: "$$product.discount",
                            offPrice: "$$product.offPrice",
                            quantity: "$$product.quantity",
                            colors: "$$product.colors",
                            rating: "$$product.rating",
                            category: "$$product.category",
                            brand: "$$product.brand",
                          },
                        },
                      },
                      quantity: "$$item.quantity",
                      price: "$$item.price",
                      offPrice: "$$item.offPrice",
                      totalPrice: "$$item.totalPrice",
                      selectedColor: "$$item.selectedColor",
                    },
                  },
                },
              },
            },
            {
              $lookup: {
                from: "addresses",
                localField: "shippingAddress",
                foreignField: "_id",
                as: "shippingAddressDetails",
              },
            },
            {
              $unwind: {
                path: "$shippingAddressDetails",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $addFields: {
                shippingAddress: "$shippingAddressDetails",
              },
            },
            {
              $project: {
                orderProductDetails: 0,
                shippingAddressDetails: 0,
              },
            },
          ],
          as: "orders",
        },
      },

      // Lookup reviews placed by the user with pipeline
      {
        $lookup: {
          from: "reviews",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$user", "$$userId"] } },
            },
            {
              $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "reviewProductDetails",
              },
            },
            {
              $addFields: {
                product: {
                  $let: {
                    vars: {
                      product: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$reviewProductDetails",
                              as: "rpd",
                              cond: { $eq: ["$$rpd._id", "$product"] },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: {
                      _id: "$$product._id",
                      title: "$$product.title",
                      slug: "$$product.slug",
                      images: "$$product.images",
                      price: "$$product.price",
                      discount: "$$product.discount",
                      offPrice: "$$product.offPrice",
                      quantity: "$$product.quantity",
                      colors: "$$product.colors",
                      rating: "$$product.rating",
                      category: "$$product.category",
                      brand: "$$product.brand",
                    },
                  },
                },
              },
            },
            {
              $addFields: {
                reactions: {
                  $let: {
                    vars: {
                      reactions: "$reactions",
                    },
                    in: {
                      likeCount: "$$reactions.likeCount",
                      dislikeCount: "$$reactions.dislikeCount",
                    },
                  },
                },
              },
            },
            {
              $project: {
                reviewProductDetails: 0,
              },
            },
          ],
          as: "reviews",
        },
      },

      // Lookup wishlist placed by the user with pipeline
      {
        $lookup: {
          from: "wishlists",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$user", "$$userId"] } },
            },
            {
              $lookup: {
                from: "products",
                localField: "products",
                foreignField: "_id",
                as: "wishlistProductDetails",
              },
            },
            {
              $unwind: "$wishlistProductDetails",
            },
            {
              $replaceRoot: {
                newRoot: "$wishlistProductDetails",
              },
            },
            {
              $project: {
                _id: 1,
                title: 1,
                slug: 1,
                images: 1,
                price: 1,
                discount: 1,
                offPrice: 1,
                quantity: 1,
                colors: 1,
                rating: 1,
                category: 1,
                brand: 1,
              },
            },
          ],
          as: "wishlist",
        },
      },

      // Update cartProductDetails and coupon fields with the results from discountDetail
      {
        $set: {
          cartProductDetails: "$discountDetail.cartProductDetails",
          coupon: "$discountDetail.coupon",
        },
      },

      // Final projection of required fields
      {
        $project: {
          _id: 0,
          user: 1,
          cart: {
            productDetails: "$cartProductDetails",
            coupon: "$coupon",
            payDetail: "$payDetail",
          },
          payments: "$payments",
          orders: "$orders",
          wishlist: "$wishlist",
          reviews: "$reviews",
          addresses: "$addresses",
          creditCards: "$creditCards",
        },
      },
    ]);

    return copyObject({
      user: profile[0]?.user || {},
      cart: profile[0]?.cart || {},
      orders: profile[0]?.orders || [],
      payments: profile[0]?.payments || [],
      wishlist: profile[0]?.wishlist || [],
      reviews: profile[0]?.reviews || [],
      addresses: profile[0]?.addresses || [],
      creditCards: profile[0]?.creditCards || [],
    });
  }
}

module.exports = UserService;
