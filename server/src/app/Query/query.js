//------------- DML Query -------------------------------

//-------------------------user related query----------------

const getUser = " SELECT * FROM Users WHERE email = $1 ";

const isEmailExist =
  " SELECT COUNT(*) AS email_count FROM Users WHERE email= $1";

const InsertUser =
  " INSERT INTO Users(username , email,password) VALUES($1,$2,$3) ";

//---------------------------orders related query--------------------

const createOrderId =
  " INSERT INTO Orders(customer_id,total_amount,status) VALUES($1,$2,$3) RETURNING orderId ";

const addingItem =
  " INSERT INTO OrderItem(order_id , product_id , quantity , price_per_unit , total_price) VALUES($1 , $2, $3 ,$4, $5)  ";

const getAllActiveOrder = " SELECT * FROM Orders WHERE status = 'Active' ";

const updateTheOrder =
  " UPDATE Orders SET total_amount = $1 , status  = $2 WHERE orderId = $3 ";

//--------------------- query for creating new tabel in databse  DDL Query -----------------------------------------
const createTabel =
  " CREATE TABLE Users (userID  SERIAL  PRIMARY KEY, username varchar(255) , email varchar(255) , password varchar(255))";

const createOrderTabel =
  "  CREATE TABLE Orders(orderId SERIAL PRIMARY KEY , customer_id INT REFERENCES Users(userID),order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,total_amount DECIMAL(10,2),status VARCHAR(50) ) ";

const createOrderItme =
  "  CREATE TABLE OrderItem (order_item_id SERIAL PRIMARY KEY, order_id INT REFERENCES Orders(orderId), product_id INT,  quantity INT, price_per_unit DECIMAL(10, 2), total_price DECIMAL(10, 2));  ";

const productDetailTabel =
  "  CREATE TABLE Products (product_Id SERIAL PRIMARY KEY , Product_Name VARCHAR(255) , Product_Image VARCHAR(255), Product_Price INT, Quantity INT, Category VARCHAR(255) )  ";

module.exports = {
  getUser,
  InsertUser,
  createTabel,
  isEmailExist,
  createOrderItme,
  createOrderTabel,
  productDetailTabel,
  createOrderId,
  addingItem,
  getAllActiveOrder,
  updateTheOrder,
};
