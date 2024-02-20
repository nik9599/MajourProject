const db = require("../../database/database.js");
const constants = require("../../utils/constant.js");
const {
  createOrderId,
  addingItem,
  getAllActiveOrder,
  updateTheOrder,
} = require("../Query/query.js");

const orderId = (req, res) => {
  const { customer_id, total_amount, status } = req.body;
  const values = [customer_id, total_amount, status];

  if (customer_id == null || customer_id == undefined) {
    return res
      .status(500)
      .json({ msg: constants.SERVER_ERROR, success: false });
  }

  db.pool.query(createOrderId, values, (err, result) => {
    if (err) {
      console.log(`error while creating order id = > ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    } else {
      return res.status(200).json({
        msg: constants.ORDER_ID,
        success: true,
        order_Id: result.rows[0].orderid,
      });
    }
  });
};

const addOrderItem = async (req, res) => {
  const orders = req.body;

  await orders.map((order) => {
    const value = [
      order.order_id,
      order.product_id,
      order.quantity,
      order.price_per_unit,
      order.total_price,
    ];
    db.pool.query(addingItem, value, (err, result) => {
      if (err) {
        console.log(`Error while placing order => ${err.message}`);
        return res
          .status(500)
          .json({ msg: constants.SERVER_ERROR, success: false });
      }
    });
  });
  return res
    .status(200)
    .json({ msg: constants.ORDER_PLACED_SUCCESSFULLY, success: true });
};

const getActiveOrder = (req, res) => {
  db.pool.query(getAllActiveOrder, (err, result) => {
    if (err) {
      console.log(`Error while get active order => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    } else {
      return res.status(200).json({ data: result.rows, success: true });
    }
  });
};

const updateOrder = (req, res) => {
  const { total_amount, status, orderId } = req.body;

  const value = [total_amount, status, orderId];

  db.pool.query(updateTheOrder, value, (err, result) => {
    if (err) {
      console.log(`Error while updating order => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    } else {
      return res
        .status(200)
        .json({ msg: constants.ORDER_DETAIL_UPDATED, success: true });
    }
  });
};

module.exports = { orderId, addOrderItem, getActiveOrder ,updateOrder};
