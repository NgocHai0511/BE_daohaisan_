const PromoCode = require("../models/PromoCode");
const User = require("../models/User");

const getAllPromoCodes = async (req, res) => {
  try {
    const PromoCodes = await PromoCode.find();
    if (!PromoCodes) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bất kỳ mã giảm giá nào!" });
    }
    return res
      .status(200)
      .json({ message: "Tất cả mã khuyến mãi!", data: PromoCodes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Có lỗi xảy ra", err: err.message });
  }
};

const checkPromoCodes = async (req, res) => {
  try {
    const userid = req.user.id;
    const { code } = req.params;
    // Kiểm tra mã khuyến mãi có tồn tại không
    const promoCode = await PromoCode.findOne({ code: code });
    if (!promoCode) {
      return res.status(404).json({ message: "Mã khuyễn mãi không tồn tại!" });
    }
    // Kiểm tra mã khuyến mãi có phải thuộc nhười dùng hay không
    if (promoCode.user_id != userid) {
      return res
        .status(404)
        .json({ message: "Mã khuyến mãi sai hoặc không thuộc của bạn!" });
    }
    // Kiểm tra mã khuyễn mãi còn số lần sử dụng không
    if (promoCode.available == 0) {
      return res
        .status(400)
        .json({ message: "Mã khuyến mãi đã hết số lần sử dụng!" });
    }
    return res
      .status(200)
      .json({ message: "Mã khuyến mãi hợp lệ!", promoCode: promoCode });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Có lỗi xảy ra", err: err.message });
  }
};

const addPromoCode = async (req, res) => {
  try {
    const { code, user_id, available, value } = req.body;

    const newPromoCode = await PromoCode.create({
      code,
      user_id,
      available,
      value,
    });

    if (!newPromoCode) {
      res.status(400).json({
        message:
          "Không thể thêm mới mã giảm giá! Vui lòng kiểm tra lại các trường đầu vào!!",
      });
    }

    res.status(201).json({
      message: "Thêm thành công mã giảm giá!",
      newPromoCode: newPromoCode,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Có lỗi xảy ra", err: err.message });
  }
};

const removePromoCode = async (req, res) => {
  try {
    const { code } = req.body;

    let deletedPromoCode = await PromoCode.deleteOne({ code });
    if (deletedPromoCode.deletedCount == 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy mã khuyến mãi để xóa!" });
    }
    return res
      .status(201)
      .json({ message: "Đã xóa mã khuyến mãi!", data: { deletedPromoCode } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Có lỗi xảy ra", err: err.message });
  }
};

module.exports = {
  getAllPromoCodes,
  addPromoCode,
  checkPromoCodes,
  removePromoCode,
};
