# API domain server: https://daohaisan.azurewebsites.net

## API Đăng Ký Tài Khoản (dnh)

### Endpoint

-   `/api/user/signup`

### Phương thức

-   POST

### Mô tả

Đăng ký một tài khoản mới.

### Yêu cầu

#### Header

-   `Content-Type: application/json`

#### Thân yêu cầu (Request Body)

-   `account` (String, bắt buộc, unique): Tên tài khoản.
-   `password` (String, bắt buộc): Mật khẩu. >= 6 kí tự
-   `full_name` (String, bắt buộc): Tên đầy đủ.
-   `email` (String, bắt buộc, unique): Địa chỉ email.
-   `phone` (Number, unique): Số điện thoại.
-   `gender` (String): Giới tính.
-   `address` (String): Địa chỉ.

### Kết quả thành công

#### Response 201 - Created

```json
{
    "message": "success",
    "data": {
        "new_account": {
            "_id": "5fba4e7a8d61c732c0cf8e5a",
            "account": "nguyenvanA",
            "isAdmin": false
        },
        "new_user": {
            "_id": "5fba4e7a8d61c732c0cf8e5b",
            "account_id": "5fba4e7a8d61c732c0cf8e5a",
            "full_name": "Nguyen Van A",
            "email": "nguyenvana@example.com"
        }
    }
}
```

### Kết quả thất bại

#### Response 500 - Internal Server Error

```json
{
    "message": "Account creation failed",
    "error": {
        "message": "E11000 duplicate key error collection: mydb.accounts index: account_1 dup key: { account: \"nguyenvanA\" }",
        "name": "MongoError",
        "code": 11000,
        "keyPattern": {
            "account": 1
        },
        "keyValue": {
            "account": "nguyenvanA"
        }
    }
}
```

## API Đăng nhập Tài Khoản (ntn)

### Endpoint

-   `/api/user/login`

### Phương thức

-   POST

### Mô tả

Đăng nhập tài khoản.

### Yêu cầu

#### Header

-   `Content-Type: application/json`

#### Thân yêu cầu (Request Body)

-   `account` (String, bắt buộc): Tên tài khoản.
-   `password` (String, bắt buộc): Mật khẩu.

### Kết quả thành công

-   **Response 201 - OK**: `{
                "success": true,
                "message": "đăng nhập thành công!",
                "id": "651d3c8812d102cb1ae294fe" 
                "is_admin": false
            }`

#### Response 201 - OK

```json
{
    "success": true,
    "message": "đăng nhập thành công!",
    "id": "651d3c8812d102cb1ae294fe"
}
```

### Kết quả thất bại

#### Response 500 - Internal Server Error

```json
{
    "success": false,
    "message": "tài khoản hoặc mật khẩu không đúng!"
}
```

## API Lấy Tất Cả Sản Phẩm (ntn_product)

### Endpoint

-   `/api/product/getallproducts`

### Phương thức

-   GET

### Mô tả

Lấy tất cả sản phẩm.

### Kết quả thành công

-   **Response 200 - OK**: `{
                                "success": true,
                                "allProducts": [
                                    {
                                        "_id": "65337df5fc0a47cae4ee3d29",
                                        "id": "SP0001",
                                        "name": "Cá pasa",
                                        "category": "Hải sản đông lạnh",
                                        "description": "Cá pasa cực béo, bổ dưỡng. Được đánh bắt từ Himalia",
                                        "imageUrl": "will update,not yet",
                                        "weight": "500g",
                                        "price": "500,000đ",
                                        "available": "6",
                                        "createdAt": "2023-10-21T07:29:57.593Z",
                                        "updatedAt": "2023-10-21T07:36:03.496Z",
                                        "__v": 0
                                        },
                                        {
                                        "_id": "6533810233a3d0d4bdb83e27",
                                        "id": "SP0002",
                                        "name": "Ốc ngón tay",
                                        "category": "Hải sản tươi sống",
                                        "description": "Thơm ngon, tươi sạch. Được đánh bắt từ Himalia",
                                        "imageUrl": "will update,not yet",
                                        "weight": "500g",
                                        "price": "300,000đ",
                                        "available": "5",
                                        "createdAt": "2023-10-21T07:42:58.190Z",
                                        "updatedAt": "2023-10-21T07:42:58.190Z",
                                        "__v": 0
                                        },
                                        {
                                        "_id": "6533818c33a3d0d4bdb83e2d",
                                        "id": "SP0004",
                                        "name": "Hàu tươi cực to",
                                        "category": "Hải sản tươi sống",
                                        "description": "Thơm ngon, tươi sạch. Được đánh bắt từ Himalia",
                                        "imageUrl": "will update,not yet",
                                        "weight": "500g",
                                        "price": "650,000đ",
                                        "available": "7",
                                        "createdAt": "2023-10-21T07:45:16.889Z",
                                        "updatedAt": "2023-10-21T07:59:51.092Z",
                                        "__v": 0
                                    }
                                ]
                            }`

### Kết quả thất bại

#### Response 404 - Not Found

```json
{
    "success": false,
    "message": "Lỗi: Không thể lấy sản phẩm!"
}
```

#### Response 500 - Internal Server Error

```json
{
    "success": false,
    "message": "err.message",
}
```