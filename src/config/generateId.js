const Product = require("../models/Product.js");

let auto_create_id_product = async () => {
    let product = await Product.find().sort({$natural:-1}).limit(1);
    if (product.length == 0) {
        return 'SP0001';
    } else {
        let oldId = parseInt(product[0].id.slice(2).replace('0',''));
        let newId = oldId + 1;
        if (newId >= 1000) {
            return 'SP' + newId;
        } else if (newId >= 100) {
            return 'SP0' + newId;
        } else if (newId >= 10) {
            return 'SP00' + newId;
        } else {
            return 'SP000' + newId;
        }
    }
}

module.exports = {auto_create_id_product}