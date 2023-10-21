# Thông tin API

URL: `daohaisan.azurewebsites.net/`

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

Ví dụ

```json
{
    "message": "Lấy sản phẩm thành công",
    "data": {
        "_id": "60afb2c76ef5b902180aacba",
        "images": [
            "https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg"
        ],
        "price": 3190000,
        "rating": 4.6,
        "price_before_discount": 3990000,
        "quantity": 138,
        "sold": 1200,
        "view": 696,
        "name": "Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng",
        "description": "",
        "category": "60afafe76ef5b902180aacb5",
        "image": "https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg",
        "createdAt": "2021-05-27T14:55:03.113Z",
        "updatedAt": "2021-06-12T14:22:55.871Z"
    }
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

## Lấy Tất Cả Sản Phẩm: `/api/products`

**Phương thức:** GET

**Response:**

    ```json
    {
      "message": "Thành công",
      "data": {
        "products": [
          {
            // Chi tiết sản phẩm
          },
          {
            // Chi tiết sản phẩm
          },
          // Các sản phẩm khác
        ]
      }
    }
    ```

-   Nếu không có sản phẩm:

    -   Status: 404 Not Found
    -   Message: "Lỗi: Không thể lấy sản phẩm!"

-   Nếu xảy ra lỗi:
    -   Status: 500 Internal Server Error
    -   Message: "Có lỗi xảy ra"
    -   Data: Thông tin về lỗi (error)

## Lấy Sản Phẩm Theo Từ Khóa: `/api/products/:searchstring`

**Phương thức:** GET

**URL Parameter:**

-   `searchstring`: Từ khóa tìm kiếm

**Response:**

-   Nếu tìm thấy sản phẩm phù hợp:

    ```json
    {
        "message": "Tìm thấy [số lượng] sản phẩm phù hợp",
        "data": {
            "products": [
                {
                    // Chi tiết sản phẩm
                },
                {
                    // Chi tiết sản phẩm
                }
                // Các sản phẩm khác
            ]
        }
    }
    ```

-   Nếu không tìm thấy sản phẩm phù hợp:

    ```json
    {
        "message": "Không tìm thấy sản phẩm nào phù hợp",
        "data": {
            "products": []
        }
    }
    ```

-   Nếu xảy ra lỗi:
    -   Status: 500 Internal Server Error
    -   Message: "Có lỗi xảy ra"
    -   Data: Thông tin về lỗi (error)

## Thêm Mới Sản Phẩm: `/api/product`

**Phương thức:** POST

**Request Body:**

```json
{
    "name": "Tên sản phẩm",
    "category": "Danh mục sản phẩm",
    "description": "Mô tả sản phẩm",
    "imageUrl": "Đường dẫn hình ảnh",
    "weight": "Khối lượng sản phẩm",
    "price": "Giá sản phẩm",
    "available": "Số lượng có sẵn"
}
```

**Response:**

-   Nếu sản phẩm được thêm mới:

    ```json
    {
        "message": "Thêm sản phẩm thành công",
        "data": {
            "newProduct": {
                // Chi tiết sản phẩm đã thêm
            }
        }
    }
    ```

-   Nếu không thể thêm mới sản phẩm:

    -   Status: 500 Internal Server Error
    -   Message: "Không thể thêm mới. Kiểm tra lại các trường đầu vào!!"

-   Nếu xảy ra lỗi:
    -   Status: 500 Internal Server Error
    -   Message: "Có lỗi xảy ra"
    -   Data: Thông tin về lỗi (error)

## Cập Nhật Sản Phẩm: `/api/product`

**Phương thức:** PUT

**Body:**

```json
{
    "id": "Mã sản phẩm",
    "name": "Tên sản phẩm",
    "category": "Danh mục sản phẩm",
    "description": "Mô tả sản phẩm",
    "imageUrl": "URL hình ảnh",
    "weight": "Khối lượng sản phẩm",
    "price": "Giá sản phẩm",
    "available": "Số lượng sản phẩm có sẵn"
}
```

**Rules:**

-   id: required, mã sản phẩm
-   name: Tên sản phẩm, string
-   category: Danh mục sản phẩm, string
-   description: Mô tả sản phẩm, string
-   imageUrl: URL hình ảnh, string
-   weight: Khối lượng sản phẩm, string
-   price: Giá sản phẩm, number
-   available: Số lượng sản phẩm có sẵn, number

**Response:**

-   Nếu sản phẩm không tồn tại:

    -   Status: 404 Not Found
    -   Message: "Thông tin không hợp lệ. Không thể cập nhật sản phẩm"

-   Nếu cập nhật thành công:
    -   Status: 200 OK
    -   Message: "Cập nhật thành công"
    -   Data: Thông tin sản phẩm đã cập nhật (modifiedProduct)

## Xóa Sản Phẩm: `/api/product/:id`

**Phương thức:** DELETE

**Params:**

-   `:id`: Mã sản phẩm cần xóa

**Response:**

-   Nếu không tìm thấy sản phẩm để xóa:

    -   Status: 404 Not Found
    -   Message: "Không tìm thấy sản phẩm nào để xóa"

-   Nếu xóa thành công:
    -   Status: 201 Created
    -   Message: "Đã xóa thành công"
    -   Data: Thông tin về số sản phẩm đã bị xóa (deletedProduct)
