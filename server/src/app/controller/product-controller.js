const db = require("../../database/database.js");
const constant = require("../../utils/constant.js");
const {
  InsertProduct,
  getALLProduct,
  getCategoriesProduct,
  updateProduct,
  productQuantityIncreaseQuery,
  productQuantityDecreseQuery,
  getProductById,
  addInventory,
  getProductQuantity,addHoldQuantity, removeFromHoldQuantity
} = require("../Query/query.js");

const insertProduct = (req, res) => {
  const {
    Product_Name,
    Product_Image,
    Product_Price,
    Quantity,
    Category,
    isVeged,
    isNonVeged,
  } = req.body;
  const values = [
    Product_Name,
    Product_Image,
    Product_Price,
    Category,
    isVeged,
    isNonVeged,
  ];

  if (
    Product_Name == undefined ||
    Product_Image == undefined ||
    Product_Price == undefined ||
    Quantity == undefined ||
    Category == undefined
  ) {
    return res
      .status(404)
      .json({ msg: constant.PLEASE_ENTER_THE_MISSING_VALUE, success: false });
  }

  db.pool.query(InsertProduct, values, (err, result) => {
    if (err) {
      console.log(`Error while entring the Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    } else {
      console.log(result.rows[0].product_id)
      const inventoryData = [result.rows[0].product_id, Quantity, 0];

      db.pool.query(addInventory, inventoryData, (err, result) => {
        if (err) {
          console.log(`Error while entring the Inventroy => ${err.message}`);
          return res
            .status(500)
            .json({ msg: constant.SERVER_ERROR, success: false });
        }
        return res
          .status(200)
          .json({ msg: constant.PRODUCT_SAVED, success: true });
      });
    }
  });
};

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products
    const productResult = await new Promise((resolve, reject) => {
      db.pool.query(getALLProduct, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });

    

    // Fetch quantity for each product
    const productPromises = productResult.map(async (product) => {
      try {
        const value = [product.product_id];
        const quantityResult = await new Promise((resolve, reject) => {
          db.pool.query(getProductQuantity, value, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result.rows[0].availabel_quantity);
            }
          });
        });
        product.quantity = quantityResult; // Assign quantity to product
        return product;
      } catch (err) {
        console.log(`Error while fetching product quantity: ${err.message}`);
        throw err;
      }
    });

    // Resolve all promises
    const productsWithData = await Promise.all(productPromises);

    // Respond with products with quantity
    return res.status(200).json({ data: productsWithData, success: true });
  } catch (err) {
    console.log(`Error while fetching products: ${err.message}`);
    return res.status(500).json({ msg: constant.SERVER_ERROR, success: false });
  }
};



const getCategoryProduct = (req, res) => {
  const category = req.params.category;
  const values = [category];

  db.pool.query(getCategoriesProduct, values, (err, result) => {
    if (err) {
      console.log(`Error while fetching the Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    } else {
      return res.status(200).json({ data: result.rows, success: true });
    }
  });
};

const getUpdateProduct = (req, res) => {
  const {
    Product_Name,
    Product_Image,
    Product_Price,
    Quantity,
    Category,
    product_Id,
    isVeged,
    isNonVeged,
  } = req.body;

  const values = [
    Product_Name,
    Product_Image,
    Product_Price,
    Quantity,
    Category,
    isVeged,
    isNonVeged,
    product_Id,
  ];

  db.pool.query(updateProduct, values, (err, result) => {
    if (err) {
      console.log(`Error while fetching the Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    } else {
      return res
        .status(200)
        .json({ msg: constant.PRODUCT_UPDATED, success: true });
    }
  });
};

const increasProductQuantity = (req, res) => {
  const { product_id } = req.params;

  //-------------first check is product availability-----------------------

  const value = [product_id];

  db.pool.query(getProductById, value, (err, result) => {
    if (err) {
      console.log(`Error while fetching singel Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    }

    //------------------------when product not found----------------------------

    if (result.rows.length == 0) {
      return res
        .status(404)
        .json({ msg: constant.PRODUCT_ID_NOT_FOUND, success: false });
    }

    //---------------------checking if product have quantity or not--------------

    if (result.rows[0].quantity <= 0) {
      return res
        .status(200)
        .json({ msg: constant.PRODUCT_OUT_OF_STOCK, success: false });
    }

    //--------------------incresing the product hold quantity------------------------

    db.pool.query(addHoldQuantity, value, (err, result) => {
      if (err) {
        console.log(
          `Error while incresing singel Product hold quantity => ${err.message}`
        );
        return res
          .status(500)
          .json({ msg: constant.SERVER_ERROR, success: false });
      }

      return res
        .status(200)
        .json({ msg: constant.PRODUCT_INV_INC, success: true });
    });
  });
};

const decreseProductQuantity = (req, res) => {
  const { product_id } = req.params;

  //-------------first check is product availability-----------------------

  const value = [product_id];

  db.pool.query(getProductById, value, (err, result) => {
    if (err) {
      console.log(`Error while fetching singel Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    }

    //------------------------when product not found----------------------------

    if (result.rows.length == 0) {
      return res
        .status(404)
        .json({ msg: constant.PRODUCT_ID_NOT_FOUND, success: false });
    }

    //--------------------incresing the product availabel quantity------------------------

    db.pool.query(removeFromHoldQuantity, value, (err, result) => {
      if (err) {
        console.log(
          `Error while incresing singel Product inventory quantity => ${err.message}`
        );
        return res
          .status(500)
          .json({ msg: constant.SERVER_ERROR, success: false });
      }

      return res
        .status(200)
        .json({ msg: constant.PRODUCT_INV_DEC, success: true });
    });
  });
};
 const decreseProductQuantityOffline = (req, res)=>{
  const { product_id } = req.params;

  //-------------first check is product availability-----------------------

  const value = [product_id];

  db.pool.query(getProductById, value, (err, result) => {
    if (err) {
      console.log(`Error while fetching singel Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    }

    //------------------------when product not found----------------------------

    if (result.rows.length == 0) {
      return res
        .status(404)
        .json({ msg: constant.PRODUCT_ID_NOT_FOUND, success: false });
    }

    //---------------------checking if product have quantity or not--------------

    if (result.rows[0].quantity <= 0) {
      return res
        .status(200)
        .json({ msg: constant.PRODUCT_OUT_OF_STOCK, success: false });
    }

    //--------------------incresing the product hold quantity------------------------

    db.pool.query(productQuantityDecreseQuery, value, (err, result) => {
      if (err) {
        console.log(
          `Error while incresing singel Product hold quantity => ${err.message}`
        );
        return res
          .status(500)
          .json({ msg: constant.SERVER_ERROR, success: false });
      }

      return res
        .status(200)
        .json({ msg: constant.PRODUCT_INV_INC, success: true });
    });
  });
}
 const increasProductQuantityOffline = (req, res)=>{
  const { product_id } = req.params;

  //-------------first check is product availability-----------------------

  const value = [product_id];

  db.pool.query(getProductById, value, (err, result) => {
    if (err) {
      console.log(`Error while fetching singel Product => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constant.SERVER_ERROR, success: false });
    }

    //------------------------when product not found----------------------------

    if (result.rows.length == 0) {
      return res
        .status(404)
        .json({ msg: constant.PRODUCT_ID_NOT_FOUND, success: false });
    }

    //--------------------incresing the product availabel quantity------------------------

    db.pool.query(productQuantityIncreaseQuery, value, (err, result) => {
      if (err) {
        console.log(
          `Error while incresing singel Product inventory quantity => ${err.message}`
        );
        return res
          .status(500)
          .json({ msg: constant.SERVER_ERROR, success: false });
      }

      return res
        .status(200)
        .json({ msg: constant.PRODUCT_INV_DEC, success: true });
    });
  });
}


module.exports = {
  insertProduct,
  getAllProducts,
  getCategoryProduct,
  getUpdateProduct,
  increasProductQuantity,
  decreseProductQuantity,
  decreseProductQuantityOffline,
  increasProductQuantityOffline,
 
};
