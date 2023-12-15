const User = require("../models/User.js");

const checkAdmin = async (req, res, next) => {
  try {
    const { id, isAdmin } = req.user;
    // Kiểm tra người dùng có phải admin hay không
    const user = await User.findOne({ id: id });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Tài khoản người dùng không tồn tại!" });
    }
    if (!isAdmin) {
      return res.status(400).json({
        message: "Tài khoản không đủ quyền để thực hiện hành động này!",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Có lỗi xảy ra", err: err.message });
  }
};

module.exports = checkAdmin;
