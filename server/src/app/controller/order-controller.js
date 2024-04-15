const db = require("../../database/database.js");
const constants = require("../../utils/constant.js");
const {
  createOrderId,
  addingItem,
  getAllActiveOrder,
  updateTheOrder,
  orderPlaced,
  getAllOrderByOrderId,
  getAllCompletedOrder,
  getAllTheOrderByUserId,
  getAllApprovedTheOrderByUserId,
  getTheOrderIdProduct,
  getPendingOrder
} = require("../Query/query.js");

//--------------------------------function for creating an new orderId-------------------------------------

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

//----------------------------adding all the item of an order in db-----------------------------------------

const addOrderItem = async (req, res) => {
  const order = req.body;

  console.log(order);

  const values = order.product_id.map((productId, index) => [
    order.order_id,
    productId,
    order.quantity[index],
    order.price_per_unit[index],
    order.total_price,
  ]);

  try {
    await Promise.all(
      values.map(async (value) => {
        try {
          await db.pool.query(addingItem, value);
        } catch (err) {
          console.log(`Error while placing order => ${err.message}`);
          throw err; // Throw the error to catch it later
        }
      })
    );
    return res
      .status(200)
      .json({ msg: constants.ORDER_PLACED_SUCCESSFULLY, success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: constants.SERVER_ERROR, success: false });
  }
};

//-------------------------function for fetching all the payed order for admin--------------------------------

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

//-------------------------function for fetching all the completed order for admin--------------------------------

const getCompletedOrder = (req, res) => {
  db.pool.query(getAllCompletedOrder, (err, result) => {
    if (err) {
      console.log(`Error while get completed order => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    } else {
      return res.status(200).json({ data: result.rows, success: true });
    }
  });
};

//-----------------------------function for fetching all the orderItem of orderId-----------------------------

const getAllOrderById = (req, res) => {
  const orderId = req.body.orderId;

  const value = [orderId];

  if (orderId == undefined) {
    return res
      .status(500)
      .json({ msg: constants.SERVER_ERROR, success: false });
  }

  db.pool.query(getAllOrderByOrderId, value, (err, reuslt) => {
    if (err) {
      console.log("error while fetchin all approved order =>", err.message);

      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    }

    return res.status(200).json({ data: reuslt.rows, success: true });
  });
};

//------------------------------function for placing an order in online mode-----------------------------------------

const updateOrder = (req, res) => {
  const { total_amount, status, payment_mode, orderId } = req.body;
  const value = [total_amount, status, payment_mode, orderId];

  db.pool.query(updateTheOrder, value, (err, result) => {
    if (err) {
      console.log(`Error while updating order => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    }

    const values = [orderId];
    db.pool.query(getAllOrderByOrderId, values, (err, result) => {
      if (err) {
        console.log(
          `Error while fetching orderItem by orderId => ${err.message}`
        );
        return res
          .status(500)
          .json({ msg: constants.SERVER_ERROR, success: false });
      }
      const allOrderItem = result.rows;

      Promise.all(
        allOrderItem.map((orderItem) => {
          const data = [orderItem.product_id, orderItem.quantity];
          return new Promise((resolve, reject) => {
            db.pool.query(orderPlaced, data, (err, result) => {
              if (err) {
                console.log(
                  `Error while removing hold quantity => ${err.message}`
                );
                reject(err);
              } else {
                resolve();
              }
            });
          });
        })
      )
        .then(() => {
          return res
            .status(200)
            .json({ msg: "Hold quantity freed", success: true });
        })
        .catch((error) => {
          console.log(
            `Error in one of the asynchronous tasks: ${error.message}`
          );
          return res
            .status(500)
            .json({ msg: constants.SERVER_ERROR, success: false });
        });
    });
  });
};

//------------------------------function for placing an order in offline mode-----------------------------------------

const updateOrderOffline = (req, res) => {
  const { total_amount, status, payment_mode, orderId } = req.body;
  const value = [total_amount, status, payment_mode, orderId];

  db.pool.query(updateTheOrder, value, (err, result) => {
    if (err) {
      console.log(`Error while updating order => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    }

    return res
      .status(200)
      .json({ msg: constants.ORDER_DETAIL_UPDATED, success: true });
  });
};

//----------------------------------funcation for fetching all the order placed by the specified user------------------

const getUserOrder = (req, res) => {
  const status = req.params.status;
  const userId = req.params.userId;

  if (status == "completed") {
    const value = [userId];
    db.pool.query(getAllTheOrderByUserId, value, (err, result) => {
      if (err) {
        console.log(`Error while fetching user order => ${err.message}`);
        return res
          .status(500)
          .json({ msg: constants.SERVER_ERROR, success: false });
      }
      return res.status(200).json({ data: result.rows, success: true });
    });
  } else if (status == "active"  ) {
    const value = [userId];
    db.pool.query(getAllApprovedTheOrderByUserId, value, (err, result) => {
      if (err) {
        console.log(`Error while fetching user order => ${err.message}`);
        return res
          .status(500)
          .json({ msg: constants.SERVER_ERROR, success: false });
      }
      return res.status(200).json({ data: result.rows, success: true });
    });
  }else if(status == "pending"){
    const value = [userId];
    db.pool.query(getAllApprovedTheOrderByUserId, value, (err, result) => {
      if (err) {
        console.log(`Error while fetching user order => ${err.message}`);
        return res
          .status(500)
          .json({ msg: constants.SERVER_ERROR, success: false });
      }
      return res.status(200).json({ data: result.rows, success: true });
    });
  }
};


//------------------------------------funcation for fetching orderItem fromorderId-----------------------------------

const getTheOrderItemFromOrderId = (req , res)=>{
  const orderId = req.params.orderId;
  

  if(orderId == null || undefined){
    return res.status(404).json({msg : constants.MISSING_STATMENT , success:true})
  }

  const value  = [orderId]

  db.pool.query(getTheOrderIdProduct , value , (err ,result)=>{
    if (err) {
      console.log(`Error while fetching  orderItem => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    }

    return res.status(200).json({data : result.rows  , success: true})

  } )

}


//-------------------------------function for fetching pending order-----------------------------------------------

const pendingOrder = (req , res)=>{
  const userId = req.params.userId;
  

  if(userId == null || undefined){
    return res.status(404).json({msg : constants.MISSING_STATMENT , success:true})
  }

  const value  = [userId]

  db.pool.query(getPendingOrder , value , (err ,result)=>{
    if (err) {
      console.log(`Error while fetching  orderItem => ${err.message}`);
      return res
        .status(500)
        .json({ msg: constants.SERVER_ERROR, success: false });
    }

    return res.status(200).json({data : result.rows  , success: true})

  } )

}

module.exports = {
  orderId,
  addOrderItem,
  getActiveOrder,
  updateOrder,
  updateOrderOffline,
  getAllOrderById,
  getCompletedOrder,
  getUserOrder,
  getTheOrderItemFromOrderId ,
  pendingOrder
};
