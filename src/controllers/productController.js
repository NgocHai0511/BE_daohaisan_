const { auto_create_id_product } = require("../config/generateId.js");
const Product = require("../models/Product.js");
const Order = require("../models/Order.js");
const User = require("../models/User.js");
const { urlFromFireBase } = require("../config/setupfirebase.js");

const getAllProducts = async (req, res, next) => {
  try {
    let allProducts = await Product.find();
    if (allProducts.length == 0) {
      res.status(404).json({
        message: "Lỗi: Không thể lấy sản phẩm!",
      });
    } else
      res.status(200).json({
        message: "Thành công",
        data: {
          products: allProducts,
        },
      });
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra",
      data: {
        error: err,
      },
    });
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, category, description, weight, price, available } = req.body;
    const idOfNewProduct = await auto_create_id_product();
    if (!req.file) {
      return res.status(404).json({
        message: "Không tìm thấy hình ảnh sản phẩm. Kiểm tra lại input file!",
      });
    }
    const imageUrl = await urlFromFireBase(req.file);
    console.log(imageUrl);
    if (!imageUrl) {
      return res.status(500).json({
        message: "Lỗi khi lấy url image!",
      });
    }

    const newProduct = await Product.create({
      id: idOfNewProduct,
      name,
      category,
      description,
      imageUrl,
      weight,
      price,
      available,
    });

    if (newProduct) {
      return res.status(201).json({
        message: "Thêm sản phẩm thành công",
        data: {
          newProduct,
        },
      });
    }

    res.status(500).json({
      message: "Không thể thêm mới. Kiểm tra lại các trường đầu vào!!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra",
      data: {
        error: err,
      },
    });
  }
};

const searchProducts = async (req, res, next) => {
  try {
    let searchString = req.params.searchstring;
    let product = await Product.find({
      $or: [
        {
          name: { $regex: `.*${searchString}.*`, $options: "i" },
        },
        {
          description: { $regex: `.*${searchString}.*`, $options: "i" },
        },
      ],
    });

    if (product.length == 0) {
      res.status(200).json({
        message: "Không tìm thấy sản phẩm nào phù hợp",
        data: {
          products: [],
        },
      });
    } else
      res.status(200).json({
        message: `Tìm thấy ${product.length} sản phẩm phù hợp`,
        data: {
          data: {
            products: product,
          },
        },
      });
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra",
      data: {
        error: err,
      },
    });
  }
};

const getSingleProduct = (req, res, next) => {
  const id = req.params.id;
  if (id === undefined || id === "") {
    const error = new Error("Invalid Id!");
    error.statusCode = 400;
    throw error;
  }

  Product.findOne({ id: id })
    .then((product) => {
      if (!product) {
        const error = new Error("Không có sản phẩm phù hợp với Id");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Successful!",
        data: {
          productInfo: product,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(err.statusCode).json({
        message: "Có lỗi xảy ra",
        data: { error: err.message },
      });
    });
};

const getPanigationProduct = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 6;
    let category = req.query.category || "";

    let getPageProduct = await Product.aggregate([
      {
        $match: {
          category: { $regex: `.*${category}.*`, $options: "i" }, // ignore case
        },
      },
      { $skip: (page - 1) * size },
      { $limit: size },
    ]);

    if (getPageProduct.length != 0) {
      res.status(200).json({
        message: "Successfully",
        data: {
          products: getPageProduct,
        },
      });
    } else {
      res.status(404).json({
        message: "Không tìm được sản phẩm. kiểm tra tham số đầu vào.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra",
      data: {
        error: err,
      },
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    let { id, name, category, description, image, weight, price, available } =
      req.body;

    if (req.file) {
      console.log("Có ảnh tải lên");
      image = await urlFromFireBase(req.file);
    }

    let newUpdateProduct = await Product.findOneAndUpdate(
      { id },
      {
        name,
        category,
        description,
        imageUrl: image,
        weight,
        price,
        available,
      },
      { new: true }
    );

    if (!newUpdateProduct) {
      res.status(404).json({
        message: "Thông tin không hợp lệ. Không thể cập nhập sản phẩm",
      });
    } else
      res.status(200).json({
        message: "Cập nhập thành công",
        modifiedProduct: newUpdateProduct,
      });
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra",
      data: {
        error: err,
      },
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    let id = req.params.id;

    let deleProduct = await Product.deleteOne({ id });

    if (deleProduct.deletedCount == 0) {
      res.status(404).json({
        message: "Không tìm thấy sản phẩm nào để xóa",
      });
    } else {
      // Tìm tất cả sản phẩm có id trên và xóa nó trong giỏ hàng của từng người
      const allCartOfUsers = await User.find();

      allCartOfUsers.forEach(async (user) => {
        user.cart.items = user.cart.items.filter((item) => {
          item.productId !== id;
        });
        await user.save();
      });

      // Trả kết quả trở về
      res.status(201).json({
        message: "Đã xóa thành công",
        data: {
          deletedProduct: deleProduct.deletedCount,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra",
      data: {
        error: err,
      },
    });
  }
};

const analyzeDataAndReport = async (req, res) => {
  try {
    let { startDate, endDate } = req.query;
    console.log(startDate + " " + endDate);
    if (startDate && !(startDate instanceof Date)) {
      startDate = new Date(startDate + "T00:00:00.000Z");
    }

    if (endDate && !(endDate instanceof Date)) {
      endDate = new Date(endDate + "T23:59:59.999Z");
    }

    // Truy xuất doanh thu của tất cả category
    const categoryReport = await Product.aggregate([
      {
        $lookup: {
          from: "orders",
          let: { productId: "$id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    // Kiểm tra xem startDate có tồn tại không, nếu không thì luôn là true
                    {
                      $cond: {
                        if: startDate,
                        then: { $gte: ["$createdAt", startDate] },
                        else: true,
                      },
                    },
                    // Kiểm tra xem endDate có tồn tại không, nếu không thì luôn là true
                    {
                      $cond: {
                        if: endDate,
                        then: { $lte: ["$createdAt", endDate] },
                        else: true,
                      },
                    },
                    { $in: ["$$productId", "$products.productId"] }, // Điều kiện kết hợp dựa trên productId
                  ],
                },
              },
            },
          ],
          as: "orderDetails",
        },
      },
      {
        $unwind: {
          path: "$orderDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            category: "$category",
            productId: "$id",
          },
          totalRevenue: {
            $sum: {
              $reduce: {
                input: "$orderDetails.products",
                initialValue: 0,
                in: {
                  $add: [
                    "$$value",
                    {
                      $cond: {
                        if: { $eq: ["$$this.productId", "$id"] },
                        then: {
                          $multiply: ["$$this.price", "$$this.quantity"],
                        },
                        else: 0,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.category",
          categoryDetails: {
            $push: {
              productId: "$_id.productId",
              totalRevenue: "$totalRevenue",
            },
          },
          totalCategoryRevenue: { $sum: "$totalRevenue" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          categoryDetails: 1,
          totalCategoryRevenue: 1,
        },
      },
      {
        $group: {
          _id: null,
          dataCategory: {
            $push: {
              name: "$category",
              value: "$totalCategoryRevenue",
            },
          },
          total: { $sum: "$totalCategoryRevenue" },
        },
      },
      {
        $project: {
          _id: 0,
          dataCategory: {
            $filter: {
              input: "$dataCategory",
              as: "category",
              cond: { $gt: ["$$category.value", 0] },
            },
          },
          total: 1,
        },
      },
    ]);

    // Truy xuất top 10 product có doanh thu cao
    const productReport = await Order.aggregate([
      {
        $match: {
          $expr: {
            $or: [
              {
                $and: [
                  { $gte: ["$createdAt", startDate] },
                  { $lte: ["$createdAt", endDate] },
                ],
              },
              {
                $cond: {
                  if: {
                    $or: [
                      { $eq: [startDate, undefined] },
                      { $eq: [endDate, undefined] },
                    ],
                  },
                  then: true,
                  else: false,
                },
              },
            ],
          },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: "$products.productId",
          value: {
            $sum: {
              $multiply: ["$products.price", "$products.quantity"],
            },
          },
        },
      },
      {
        $sort: {
          value: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $lookup: {
          from: "products", // Tên của bảng Product
          localField: "_id",
          foreignField: "id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: 0,
          value: 1,
          name: "$productDetails.name",
        },
      },
    ]);

    // Trả về kết quả
    return res
      .status(200)
      .json({ data1: { ...categoryReport[0], dataProduct: productReport } });
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra",
      data: {
        error: err.message,
      },
    });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getPanigationProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  analyzeDataAndReport,
};
