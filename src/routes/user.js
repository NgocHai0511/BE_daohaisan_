const router = require("express").Router();
const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const promoCodeController = require("../controllers/promoCodeController");
const { upload } = require("../config/setupfirebase");
const validateToken = require("../config/validateTokenHandler");

// API FOR USER
//[GET] api/user/:id
router.get("/user/:id", validateToken, userController.getUser);
//[POST] api/user/login
router.post("/user/login", userController.loginUser);
//[POST] api/user/
router.post("/user/register", userController.registerUser);
//[PUT] api/user/info
router.put("/user/info", validateToken, userController.updateUserInfo);
//[PUT] api/user/changePass
router.put(
  "/user/changePass",
  validateToken,
  userController.updatePasswordUser
);
//[PUT] api/user/changeAvatar
router.put(
  "/user/changeAvatar",
  validateToken,
  upload.single("avatar"),
  userController.updateUserAvatar
);
//[DELETE] api/user/delete
router.delete("/user/delete", validateToken, userController.deleteUser);

// API FOR CART
//[GET] api/user/cart
router.get("/userCartInfo", validateToken, userController.getCart);
//[POST] api/user/addCartItem
router.post(
  "/user/addCartItem",
  validateToken,
  userController.addProductToCart
);
//[DELETE] api/user/removeCartItem
router.delete(
  "/user/removeCartItem",
  validateToken,
  userController.removeProductFromCart
);
//[PUT] api/user/dscCartItem
router.put(
  "/user/dscCartItem",
  validateToken,
  userController.dscQuantityProductInCart
);

//POST api/resetpass/checkmail
router.post("/resetpass/checkMail", userController.checkMailAndSendCode);
//POST api/resetpass/checkmail
router.post("/resetpass/checkResetCode", userController.checkResetCode);
//POST api/resetpass/checkmail
router.put("/resetpass/", userController.changePassword);

// API FOR ORDER
//[GET] api/order:userId (get order by userId)
router.get("/orders/:userId", validateToken, orderController.getOrderByUserId);
//[GET] api/order:id (get order by id)
router.get("/order/:id", validateToken, orderController.getOrderById);
//[POST] api/order
router.post("/order", validateToken, orderController.createOrder);

// API FOR PROMOCODE
router.get(
  "/promocode/:code",
  validateToken,
  promoCodeController.checkPromoCodes
);

module.exports = router;
