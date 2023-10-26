# Thông tin API

Domain: `daohaisan.azurewebsites.net/`

Đối với các route cần xác thực => Gửi token lên bằng headers với key là `authorization`. Token phải bắt đầu bằng 'Bearer '.
(Hiện tại chưa cần xác thực)

## Format trả về

Là một object

```ts
interface Response {
    message: string
    data?: any
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

-   **Yêu cầu API:** Lấy danh sách tất cả sản phẩm.
-   **Phương thức:** GET
-   **ENDPOINT:** `/api/admin/products`

### 2. Tìm kiếm sản phẩm

-   **Yêu cầu API:** Tìm kiếm sản phẩm theo tên hoặc từ khóa.
-   **Phương thức:** GET
-   **ENDPOINT:** `/api/admin/products/sò điệp`

### 3. Thêm sản phẩm mới

-   **Yêu cầu API:** Tạo một sản phẩm mới với thông tin cụ thể.
-   **Phương thức:** POST
-   **ENDPOINT:** `/api/product`
-   **Body:** Dữ liệu sản phẩm dưới dạng Form Data với các trường thông tin sau:

    -   `name` (text): Tên sản phẩm.
    -   `category` (text): Danh mục sản phẩm.
    -   `description` (text): Mô tả sản phẩm.
    -   `weight` (text): Trọng lượng sản phẩm.
    -   `price` (text): Giá sản phẩm.
    -   `available` (text): Số lượng có sẵn.
    -   `imageUrl` (file): Hình ảnh sản phẩm.

Ví dụ dữ liệu form data:

-   `name`: "test 1"
-   `category`: "hải sản"
-   `description`: "hải sản"
-   `weight`: "100g"
-   `price`: "50000"
-   `available`: "10"
-   `imageUrl`: [file image] (Tải lên hình ảnh sản phẩm)

### 4. Cập nhật thông tin sản phẩm

-   **Yêu cầu API:** Cập nhật thông tin của một sản phẩm dựa trên ID.
-   **Phương thức:** PUT
-   **ENDPOINT:** `/api/product`
-   **Body:** Dữ liệu sản phẩm cần cập nhật dưới dạng Form Data với các trường thông tin sau:

    -   `id` (text): Mã sản phẩm cần cập nhật.
    -   `name` (text): Tên sản phẩm.
    -   `category` (text): Danh mục sản phẩm.
    -   `description` (text): Mô tả sản phẩm.
    -   `weight` (text): Trọng lượng sản phẩm.
    -   `price` (text): Giá sản phẩm.
    -   `available` (text): Số lượng có sẵn.
    -   `imageUrl` (file): Hình ảnh sản phẩm.

Ví dụ dữ liệu form data:

-   `id`: "SP0015"
-   `name`: "test 1"
-   `category`: "hải sản"
-   `description`: "hải sản"
-   `weight`: "100g"
-   `price`: "50000"
-   `available`: "10"
-   `imageUrl`: [file image] (Tải lên hình ảnh sản phẩm)

### 5. Xóa sản phẩm

-   **Yêu cầu API:** Xóa một sản phẩm dựa trên ID.
-   **Phương thức:** DELETE
-   **ENDPOINT:** `/api/product/SP0015`

### 6. Lấy danh sách tất cả User (Bao gồm cả Admin)

-   **Yêu cầu API:** Lấy danh sách tất cả người dùng, bao gồm cả người dùng quản trị (Admin).
-   **Phương thức:** GET
-   **ENDPOINT:** `/api/users`

### 7. Lấy danh sách tất cả Khách hàng

-   **Yêu cầu API:** Lấy danh sách tất cả khách hàng.
-   **Phương thức:** GET
-   **ENDPOINT:** `/api/customers`

### 8. Tạo mới một User

-   **Yêu cầu API:** Tạo một người dùng mới với thông tin cụ thể.
-   **Phương thức:** POST
-   **ENDPOINT:** `/api/user`
-   **Body:** Dữ liệu người dùng (JSON).

Các trường fullname,email,password,phone là bắt buộc.
Các trường email,phone là duy nhất

```json
{
    "fullname": "admin",
    "email": "admin@gmail.com",
    "password": "admin",
    "phone": "055113",

    "gender": "123",
    "address": "123"
}
```

### 9. Cập nhật thông tin một User

-   **Yêu cầu API:** Cập nhật thông tin của một người dùng dựa trên ID.
-   **Phương thức:** PUT
-   **ENDPOINT:** `/api/user`
-   **Body:** Dữ liệu người dùng cần cập nhật dưới dạng Form Data với các trường thông tin sau:

    -   `userId` (text): ID của người dùng cần cập nhật.
    -   `fullname` (text): Tên đầy đủ của người dùng.
    -   `email` (text): Địa chỉ email của người dùng.
    -   `password` (text): Mật khẩu người dùng.
    -   `phone` (text): Số điện thoại của người dùng.
    -   `avatarUrl` (file): Đường dẫn đến hình ảnh avatar của người dùng.
    -   `gender` (text): Giới tính của người dùng.
    -   `address` (text): Địa chỉ của người dùng.

    Ví dụ dữ liệu form data:

    -   `userId`: "KH0002"
    -   `fullname`: "User 2"
    -   `email`: "user2@gmail.com"
    -   `password`: "user 4"
    -   `phone`: "2"
    -   `avatarUrl`: [file image] (Tải lên hình ảnh avatar)
    -   `gender`: "123"
    -   `address`: "123"

### 10. Lấy thông tin giỏ hàng của một User

-   **Yêu cầu API:** Lấy thông tin giỏ hàng của một người dùng dựa trên ID người dùng.
-   **Phương thức:** GET
-   **ENDPOINT:** `/api/user/cart/KH0001`

### 11. Thêm 1 sản phẩm vào giỏ hàng của 1 user

-   **Yêu cầu API:** Thêm một sản phẩm vào giỏ hàng của một người dùng.
-   **Phương thức:** POST
-   **ENDPOINT:** `/api/user/addCartItem`
-   **Body:** Dữ liệu sản phẩm và người dùng (JSON).
    ```json
    {
        "userId": "KH0002",
        "productId": "SP0003"
    }
    ```

### 12. Xóa 1 sản phẩm ra khỏi giỏ hàng của 1 user

-   **Yêu cầu API:** Xóa một sản phẩm khỏi giỏ hàng của một người dùng dựa trên ID sản phẩm.
-   **Phương thức:** PUT
-   **ENDPOINT:** `/api/user/removeCartItem`
-   **Body:** Dữ liệu sản phẩm và người dùng (JSON).
    ```json
    {
        "userId": "KH0002",
        "productId": "SP0002"
    }
    ```

### 13. Tạo mới một đơn hàng

-   **Yêu cầu API:** Tạo một đơn đặt hàng mới với thông tin cụ thể.
-   **Phương thức:** POST
-   **ENDPOINT:** `/api/order`
-   **Body:** Dữ liệu đơn đặt hàng (JSON).
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

### 14. Lấy danh sách tất cả đơn đặt hàng

-   **Yêu cầu API:** Lấy danh sách tất cả đơn đặt hàng.
-   **Phương thức:** GET
-   **ENDPOINT:** `/api/orders`

### 15. Lấy thông tin đơn hàng của 1 user

-   **Yêu cầu API:** Lấy danh sách các đơn đặt hàng dựa trên ID người dùng.
-   **Phương thức:** GET
-   **ENDPOINT:** `/api/orders/KH0002`

### 16. Xem thông chi tiết sản phẩm

-   **Yêu cầu API:** Lấy thông tin chi tiết sản phẩm thông qua mã sản phẩm
-   **Phương thức:** GET
-   **ENDPOINT:** `/api/admin/products/SP0001`
