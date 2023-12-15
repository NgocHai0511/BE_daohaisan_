const mongoose = require("mongoose");

const PromoCode = mongoose.Schema({
  code: {
    type: String,
    require: true,
    unique: [true, "Mã khuyến mãi phải là duy nhất và không được trùng!"],
  },
  user_id: {
    type: String,
    require: true,
  },
  available: {
    type: Number,
    require: true,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Số lượng phải lớn hơn hoặc bằng 0",
    },
  },
  value: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("PromoCode", PromoCode);
