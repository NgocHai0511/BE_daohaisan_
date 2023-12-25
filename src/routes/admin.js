const router = require("express").Router();
const validateToken = require("../config/validateTokenHandler");
const productController = require("../controllers/productController");
const promoCodeController = require("../controllers/promoCodeController");
const orderController = require("../controllers/orderController");
const userController = require("../controllers/userController");
const checkAdmin = require("../config/checkAdmin.js");
const { upload } = require("../config/setupfirebase");

// API FOR USER
//[GET] api/admin/users
router.get("/users", validateToken, checkAdmin, userController.getAllUser);
//[GET] api/admin/customers
router.get(
  "/customers",
  validateToken,
  checkAdmin,
  userController.getAllCustomer
);

// API FOR PRODUCT
//GET --- api/admin/products
router.get("/products", productController.getAllProducts);
//GET -- api/admin/products/:searchstring
router.get("/products/:searchstring", productController.searchProducts);
//GET --- api/admin/product/:id
router.get("/product/:id", productController.getSingleProduct);
//POST -- api/admin/product
router.post(
  "/product",
  validateToken,
  checkAdmin,
  upload.single("image"),
  productController.createProduct
);
//PUT --api/admin/product
router.put(
  "/product/",
  validateToken,
  checkAdmin,
  upload.single("image"),
  productController.updateProduct
);
//DELETE --api/admin/product
router.delete(
  "/product/:id",
  validateToken,
  checkAdmin,
  productController.deleteProduct
);
//GET --api/admin/report
router.get("/report", productController.analyzeDataAndReport);

// API FOR ORDER
//[GET] api/admin/order
router.get("/orders", orderController.getAllOrder);
//[PUT] api/admin/order
router.put("/order", orderController.updateStatusOrder);

// API FOR PROMOCODE
router.get(
  "/promocode",
  validateToken,
  checkAdmin,
  promoCodeController.getAllPromoCodes
);
router.post(
  "/promocode",
  validateToken,
  checkAdmin,
  promoCodeController.addPromoCode
);
router.delete(
  "/promocode",
  validateToken,
  checkAdmin,
  promoCodeController.removePromoCode
);

module.exports = router;
