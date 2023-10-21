const { auto_create_id_product } = require('../autocreateid/autoCreateId.js')
const Product = require('../models/Product.js')

const getAllProducts = async (req, res, nexr) => {
    try {
        let allProducts = await Product.find()
        if (allProducts.length == 0) {
            res.status(404).json({
                message: 'Lỗi: Không thể lấy sản phẩm!',
            })
        } else
            res.status(200).json({
                message: 'Thành công',
                data: {
                    products: allProducts,
                },
            })
    } catch (err) {
        res.status(500).json({
            message: 'Có lỗi xảy ra',
            data: {
                error: err,
            },
        })
    }
}

const createProduct = async (req, res, next) => {
    try {
        let { name, category, description, imgeUrl, weight, price, available } = req.body
        let idOfNewProduct = await auto_create_id_product()
        let newProduct = await Product.create({
            id: idOfNewProduct,
            name: name,
            category: category,
            description: description,
            imgeUrl: imgeUrl,
            weight: weight,
            price: price,
            available: available,
        })
        debugger
        if (!newProduct) {
            res.status(500).json({
                message: 'Không thể thêm mới. Kiểm tra lại các trường đầu vào!!',
            })
        } else
            res.status(201).json({
                message: 'Thêm sản phẩm thành công',
                data: {
                    newProduct: newProduct,
                },
            })
    } catch (err) {
        res.status(500).json({
            message: 'Có lỗi xảy ra',
            data: {
                error: err,
            },
        })
    }
}

const getProduct = async (req, res, next) => {
    try {
        let searchString = req.params.searchstring
        let product = await Product.find({
            $or: [
                {
                    name: { $regex: `.*${searchString}.*`, $options: 'i' },
                },
                {
                    category: { $regex: `.*${searchString}.*`, $options: 'i' },
                },
                {
                    description: { $regex: `.*${searchString}.*`, $options: 'i' },
                },
            ],
        })

        if (product.length == 0) {
            res.status('200').json({
                message: 'Không tìm thấy sản phẩm nào phù hợp',
                data: {
                    products: [],
                },
            })
        } else
            res.status(200).json({
                message: `Tìm thấy ${product.length} sản phẩm phù hợp`,
                data: {
                    data: {
                        products: product,
                    },
                },
            })
    } catch (err) {
        res.status(500).json({
            message: 'Có lỗi xảy ra',
            data: {
                error: err,
            },
        })
    }
}

const updateProduct = async (req, res, next) => {
    try {
        let { id, name, category, description, imageUrl, weight, price, available } = req.body

        let newUpdateProduct = await Product.findOneAndUpdate(
            { id },
            { name, category, description, imageUrl, weight, price, available },
            { new: true }
        )

        if (!newUpdateProduct) {
            res.status(404).json({
                message: 'Thông tin không hợp lệ. Không thể cập nhập sản phẩm',
            })
        } else
            res.status(200).json({
                message: 'Cập nhập thành công',
                modifiedProduct: newUpdateProduct,
            })
    } catch (err) {
        res.status(500).json({
            message: 'Có lỗi xảy ra',
            data: {
                error: err,
            },
        })
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        let id = req.params.id

        let deleProduct = await Product.deleteOne({ id })

        if (deleProduct.deletedCount == 0) {
            res.status(404).json({
                message: 'Không tìm thấy sản phẩm nào để xóa',
            })
        } else
            res.status(201).json({
                message: 'Đã xóa thành công',
                data: {
                    deletedProduct: deleProduct.deletedCount,
                },
            })
    } catch (err) {
        res.status(500).json({
            message: 'Có lỗi xảy ra',
            data: {
                error: err,
            },
        })
    }
}

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct }
