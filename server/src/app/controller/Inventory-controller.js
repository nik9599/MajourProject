const db = require("../../database/database.js");
const constant = require("../../utils/constant.js");
const constants = require("../../utils/constant.js");

const { getAllTheInventory, updateInventory } = require("../Query/query.js");

//----------------------------funcation for fetching all the inverntory----------------------------------

const getInventory = async (req, res) => {
  db.pool.query(getAllTheInventory, (err, result) => {
    if (err) {
      console.log(`error while creating order id = > ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    }
    return res.status(200).json({ data: result.rows, success: true });
  });
};


//-----------------------------------funcation for updating inventory quantity--------------------------------

const updateInventoryValue = async (req, res) => {
  const { input, product_id } = req.body;

  if (input == null || undefined || product_id == null || undefined) {
    return res
      .status(500)
      .json({ msg: constant.MISSING_STATMENT, success: false });
  }

  const value = [input, product_id];

  db.pool.query(updateInventory, value, (err, result) => {
    if (err) {
      console.log(`error while creating order id = > ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    }

    return res
      .status(200)
      .json({ msg: constant.INVENTORY_UPDATED, success: true });
  });
};



module.exports = {
  getInventory,
  updateInventoryValue,
  
};
