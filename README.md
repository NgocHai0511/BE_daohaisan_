//API
domain: https://daohaisan.onrender.com/ \* Sign Up
Endpoint: /api/user/signup
Phương thức: POST
Mô tả: Đăng ký một tài khoản mới.
Thông tin yêu cầu:
Header:
Content-Type: application/json
Thân yêu cầu (Request Body):
account (String, bắt buộc, unique): Tên tài khoản.
password (String, bắt buộc): Mật khẩu.
full_name (String, bắt buộc): Tên đầy đủ.
email (String, bắt buộc, unique): Địa chỉ email.
phone (Number,unique): Số điện thoại.
gender (String): Giới tính.
address (String): Địa chỉ.

        Kết quả thành công (Response 201 - Created):
        message (String): "success".
        data (Object): Chứa thông tin tài khoản mới và người dùng mới.
        new_account (Object): Thông tin tài khoản mới.
        new_user (Object): Thông tin người dùng mới.

        Kết quả thất bại (Response 500 - Internal Server Error):
        message (String): "Account creation failed" hoặc "User creation failed".
        error (Object): Thông tin về lỗi.
