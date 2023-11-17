# Thông tin API

Domain: `daohaisan.azurewebsites.net/`

**To start Server. Please wait a while for your first visit.**

Đối với các route cần xác thực => Gửi token lên bằng headers với key là `authorization`. Token phải bắt đầu bằng 'Bearer '.
(Hiện tại chưa cần xác thực)

## Format trả về

Là một object

```ts
interface Response {
  message: string;
  data?: any;
}
```

## Format lỗi

### Trong trường hợp lỗi 422 (thường do form) hoặc lỗi do truyền query / param bị sai

Ví dụ về lỗi

```json
{
  "message": "Có lỗi xảy ra",
  "data": {
    "error": "thông tin lỗi"
  }
}
```

### Hoặc

```json
{
  "message": "Lỗi do abcxyz"
}
```

---

### 1. Lấy tất cả sản phẩm

- **Yêu cầu API:** Lấy danh sách tất cả sản phẩm.
- **Phương thức:** GET
- **ENDPOINT:** `/api/admin/products`

### 2. Tìm kiếm sản phẩm

- **Yêu cầu API:** Tìm kiếm sản phẩm theo tên hoặc từ khóa.
- **Phương thức:** GET
- **ENDPOINT:** `/api/admin/products/sò điệp`

### 3. Thêm sản phẩm mới

- **Yêu cầu API:** Tạo một sản phẩm mới với thông tin cụ thể.
- **Phương thức:** POST
- **ENDPOINT:** `/api/product`
- **Body:** Dữ liệu sản phẩm dưới dạng Form Data với các trường thông tin sau:

  - `name` (text): Tên sản phẩm.
  - `category` (text): Danh mục sản phẩm.
  - `description` (text): Mô tả sản phẩm.
  - `weight` (text): Trọng lượng sản phẩm.
  - `price` (text): Giá sản phẩm.
  - `available` (text): Số lượng có sẵn.
  - `imageUrl` (file): Hình ảnh sản phẩm.

Ví dụ dữ liệu form data:

- `name`: "test 1"
- `category`: "hải sản"
- `description`: "hải sản"
- `weight`: "100g"
- `price`: "50000"
- `available`: "10"
- `imageUrl`: [file image] (Tải lên hình ảnh sản phẩm)

### 4. Cập nhật thông tin sản phẩm

- **Yêu cầu API:** Cập nhật thông tin của một sản phẩm dựa trên ID.
- **Phương thức:** PUT
- **ENDPOINT:** `/api/product`
- **Body:** Dữ liệu sản phẩm cần cập nhật dưới dạng Form Data với các trường thông tin sau:

  - `id` (text): Mã sản phẩm cần cập nhật.
  - `name` (text): Tên sản phẩm.
  - `category` (text): Danh mục sản phẩm.
  - `description` (text): Mô tả sản phẩm.
  - `weight` (text): Trọng lượng sản phẩm.
  - `price` (text): Giá sản phẩm.
  - `available` (text): Số lượng có sẵn.
  - `imageUrl` (file): Hình ảnh sản phẩm.

Ví dụ dữ liệu form data:

- `id`: "SP0015"
- `name`: "test 1"
- `category`: "hải sản"
- `description`: "hải sản"
- `weight`: "100g"
- `price`: "50000"
- `available`: "10"
- `imageUrl`: [file image] (Tải lên hình ảnh sản phẩm)

### 5. Xóa sản phẩm

- **Yêu cầu API:** Xóa một sản phẩm dựa trên ID.
- **Phương thức:** DELETE
- **ENDPOINT:** `/api/product/SP0015`

### 6. Lấy danh sách tất cả User (Bao gồm cả Admin)

- **Yêu cầu API:** Lấy danh sách tất cả người dùng, bao gồm cả người dùng quản trị (Admin).
- **Phương thức:** GET
- **ENDPOINT:** `/api/users`

### 7. Lấy danh sách tất cả Khách hàng

- **Yêu cầu API:** Lấy danh sách tất cả khách hàng.
- **Phương thức:** GET
- **ENDPOINT:** `/api/customers`

### 8. Tạo mới một tài khoản User

- **Yêu cầu API:** Tạo một tài khoản người dùng mới với thông tin cụ thể.
- **Phương thức:** POST
- **ENDPOINT:** `/api/user/register`
- **Body:** Dữ liệu người dùng (JSON).

Các trường fullname,email,password,phone là bắt buộc.
Các trường email,phone là duy nhất
(Chú ý: không thể đăng ký với email mà đã tạo tài khoản)

```json
{
  "fullname": "Nguoi dung 1",
  "email": "user123@gmail.com",
  "password": "user123",
  "phone": "0994848564",
  "gender": "male",
  "address": "Quan 9, tpHCM, VietNam"
}
```

### 9. Đăng nhập vào một tài khoản User

- **Yêu cầu API:** Đăng nhập vào tài khoản của người dùng.
- **Phương thức:** POST
- **ENDPOINT:** `/api/user/login`
- **Body:** email, password (JSON).

  ````json (thực hiện gửi dữ liệu)
  {
      "fullname": "Nguoi dung 1",
      "email": "user123@gmail.com",
      "password": "user123",
      "phone": "0994848564",
      "gender": "male",
      "address": "Quan 9, tpHCM, VietNam"
  }

  => Nếu tài khoản được xác nhận, máy chủ sẽ trả về thông tin người dùng và cung cấp một mã
  token để thực hiện việc xác thực và phân quyền cho người dùng:
  ```json
  {
      "message": "Successfully",
      "data": {
          "userInfo": {
              "cart": {
                  "items": []
              },
              "_id": "655774504d0cc4c0d7300e0c",
              "id": "KH0009",
              "fullname": "Nguoi dung 1",
              "email": "user123@gmail.com",
              "password": "user123",
              "phone": "0994848564",
              "avatarUrl": "https://i.stack.imgur.com/l60Hf.png",
              "gender": "male",
              "address": "Quan 9, tpHCM, VietNam",
              "isAdmin": false,
              "createdAt": "2023-11-17T14:10:24.482Z",
              "updatedAt": "2023-11-17T14:10:24.482Z",
              "__v": 0
          },
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiS0gwMDA5IiwiZW1haWwiOiJ1c2VyMTIzQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoiTmd1b2kgZHVuZyAxIn0sImlhdCI6MTcwMDIzNzM0MiwiZXhwIjoxNzAwMjU1MzQyfQ.P86fcuO_n3mgfSb4lnliEzkMnHoZARU98Kuhuu2NOi0"
      }
  }
  ````

### 10. Cập nhật thông tin một User

- **Yêu cầu API:** Cập nhật thông tin của một người dùng dựa trên ID.
- **Phương thức:** PUT
- **ENDPOINT:** `/api/user`
- **Body:** Dữ liệu người dùng cần cập nhật dưới dạng Form Data với các trường thông tin sau:

  - `userId` (text): ID của người dùng cần cập nhật.
  - `fullname` (text): Tên đầy đủ của người dùng.
  - `email` (text): Địa chỉ email của người dùng.
  - `password` (text): Mật khẩu người dùng.
  - `phone` (text): Số điện thoại của người dùng.
  - `avatarUrl` (file): Đường dẫn đến hình ảnh avatar của người dùng.
  - `gender` (text): Giới tính của người dùng.
  - `address` (text): Địa chỉ của người dùng.

  Ví dụ dữ liệu form data:

  - `userId`: "KH0002"
  - `fullname`: "User 2"
  - `email`: "user2@gmail.com"
  - `password`: "user 4"
  - `phone`: "2"
  - `avatarUrl`: [file image] (Tải lên hình ảnh avatar)
  - `gender`: "123"
  - `address`: "123"

### 11. Lấy thông tin giỏ hàng của một User

- **Yêu cầu API:** Lấy thông tin giỏ hàng của một người dùng dựa trên ID người dùng.
- **Phương thức:** GET
- **ENDPOINT:** `/api/user/cart/KH0001`

### 12. Thêm 1 sản phẩm vào giỏ hàng của 1 user

- **Yêu cầu API:** Thêm một sản phẩm vào giỏ hàng của một người dùng.
- **Phương thức:** POST
- **ENDPOINT:** `/api/user/addCartItem`
- **Body:** Dữ liệu sản phẩm và người dùng (JSON).
  ```json
  {
    "userId": "KH0002",
    "productId": "SP0003"
  }
  ```

### 13. Xóa 1 sản phẩm ra khỏi giỏ hàng của 1 user

- **Yêu cầu API:** Xóa một sản phẩm khỏi giỏ hàng của một người dùng dựa trên ID sản phẩm.
- **Phương thức:** PUT
- **ENDPOINT:** `/api/user/removeCartItem`
- **Body:** Dữ liệu sản phẩm và người dùng (JSON).
  ```json
  {
    "userId": "KH0002",
    "productId": "SP0002"
  }
  ```

### 14. Tạo mới một đơn hàng

- **Yêu cầu API:** Tạo một đơn đặt hàng mới với thông tin cụ thể.
- **Phương thức:** POST
- **ENDPOINT:** `/api/order`
- **Body:** Dữ liệu đơn đặt hàng (JSON).
  ```json
  {
    "userId": "KH0002",
    "products": [
      {
        "name": "Cá heo",
        "imageUrl": "img.jpg",
        "price": "100000",
        "quantity": "5"
      }
    ],
    "status": "Đang xử lý",
    "totalPrice": "100000",
    "paymentInfo": {
      "method": "MoMo",
      "status": "Đã thanh toán"
    }
  }
  ```

### 15. Lấy danh sách tất cả đơn đặt hàng

- **Yêu cầu API:** Lấy danh sách tất cả đơn đặt hàng.
- **Phương thức:** GET
- **ENDPOINT:** `/api/orders`

### 16. Lấy thông tin đơn hàng của 1 user

- **Yêu cầu API:** Lấy danh sách các đơn đặt hàng dựa trên ID người dùng.
- **Phương thức:** GET
- **ENDPOINT:** `/api/orders/KH0002`

### 17. Lấy thông tin đơn hàng theo id của chính nó

- **Yêu cầu API:** Lấy đơn đặt hàng dựa trên ID của chính nó.
- **Phương thức:** GET
- **ENDPOINT:** `/api/order/DH0002`

### 18. Cập nhật trạng thái đơn hàng

- **Yêu cầu API:** Cập nhật trạng thái đơn đặt hàng.
- **Phương thức:** PUT
- **ENDPOINT:** `/api/order`
- **Body:** Dữ liệu gồm id đơn hàng và trạng thái của đơn hàng.
  ```json
  {
    "id": "DH0003",
    "status": "Giao hàng thành công!"
  }
  ```

### 19. Xem thông chi tiết sản phẩm

- **Yêu cầu API:** Lấy thông tin chi tiết sản phẩm thông qua mã sản phẩm
- **Phương thức:** GET
- **ENDPOINT:** `/api/admin/products/SP0001`

### 20. Phân trang sản phẩm

- **Yêu cầu API:** Lấy sản phẩm thông qua số trang, số lượng muốn lấy (nên để cố định), tên category nếu có
- **Phương thức:** GET (chú ý các tham số được để theo kiểu query chứ không phải params)
- **ENDPOINT:** `/api/product`
  Giải thích tham số:
  - `page`:(không bắt buộc, giá trị default = 1) là trang muốn tìm
  - `size`: là số sản phẩm mỗi trang (không bắt buộc, nếu không truyền thì mặc định = 6)
  - `category`: là loại sản phẩm (không bắt buộc, nếu không truyền thì sẽ lấy tất cả sản phẩm)
  - `Example endpoint:`: /api/product?page=1&size=10&category=Ốc
