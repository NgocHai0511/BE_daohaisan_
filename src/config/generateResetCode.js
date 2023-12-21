// Khởi tạo hàm tự động tạo mã reset code

function generateRandomCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max + 1); // Cần cộng thêm 1 vì hàm Math.random() trả về số trong khoảng [0, 1) và phép toán Math.floor sẽ làm tròn xuống.
  return Math.floor(Math.random() * (max - min)) + min;
}

// Sử dụng hàm để tạo một mã ngẫu nhiên có độ dài 8
const randomResetCode = generateRandomCode(getRandomInt(5, 8));

const randomPromoCode = generateRandomCode(5);

module.exports = { randomResetCode, randomPromoCode };
