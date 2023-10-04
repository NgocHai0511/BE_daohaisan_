# API domain server: https://daohaisan.onrender.com

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
