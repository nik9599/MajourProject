//------------- DML Query -------------------------------

//-------------------------user related query----------------

const getUser = " SELECT * FROM Users WHERE email = $1 ";

const getUserById = " SELECT * FROM Users WHERE userID  = $1 ";

const isEmailExist =
  " SELECT COUNT(*) AS email_count FROM Users WHERE email= $1";

const InsertUser =
  " INSERT INTO Users(username , email, password , mobile) VALUES($1,$2,$3,$4) ";

//---------------------------orders related query--------------------

const createOrderId =
  " INSERT INTO Orders(customer_id,total_amount,status) VALUES($1,$2,$3) RETURNING orderId ";

const addingItem =
  " INSERT INTO OrderItem(order_id, product_id, quantity, price_per_unit, total_order_price) VALUES($1, $2, $3, $4, $5); ";

const getAllActiveOrder = " SELECT * FROM Orders WHERE status = 'Approved' ";

const getAllCompletedOrder =
  " SELECT * FROM Orders WHERE status = 'Completed' ";

const updateTheOrder =
  " UPDATE Orders SET total_amount = $1 , status  = $2 , payment_mode = $3  WHERE orderId = $4 ";

const getAllOrderByOrderId = `
SELECT OrderItem.*, Products.product_name
FROM OrderItem
JOIN Products ON OrderItem.product_id = Products.product_id
WHERE OrderItem.order_id = $1
`;

//----------------------Product related Query------------------------------------------------------------

const InsertProduct =
  " INSERT INTO Products( Product_Name ,  Product_Image , Product_Price  ,  Category , isVeged , isNonVeged) VALUES( $1 , $2 , $3 , $4 , $5 ,$6  ) RETURNING product_Id ";

const getALLProduct = " SELECT * from Products ";

const getCategoriesProduct = " SELECT * from Products WHERE Category = $1 ";

const getVegProduct = " SELECT * from Products WHERE isveged = true ";

const getNonVegProduct = " SELECT * from Products WHERE isnonveged =  true ";

const getProductById = `
SELECT * from Products 
WHERE product_Id = $1 `;

const updateProduct = ` UPDATE Products 
  SET Product_Name = $1 , 
   Product_Image = $2 ,
   Product_Price = $3 ,
   Quantity =$4 ,
   Category = $5 ,
   isVeged = $6 ,
   isNonVeged = $7
   WHERE product_Id = $8  `;

const deletProduct = `
    DELETE FROM Products
    WHERE product_id = $1;
  `;

//---------------------------------------query for Inventory-----------------------------------

const addInventory = `
   INSERT INTO Inventory (
    Product_id  ,
    Availabel_quantity  ,
    Hold_quantity
   )
   VALUES( $1 , $2 , $3 )
`;

const addHoldQuantity = `
   UPDATE Inventory
   SET hold_quantity = hold_quantity + 1,
   availabel_quantity = availabel_quantity - 1
   WHERE Product_id = $1;
`;

const removeFromHoldQuantity = `
UPDATE Inventory
SET hold_quantity = hold_quantity - 1,
availabel_quantity = availabel_quantity + 1
WHERE Product_id = $1;
`;

const disolveHoldQuantity = `
   UPDATE Inventory
   SET availabel_quantity = availabel_quantity + hold_quantity,
   hold_quantity = 0 
   WHERE Product_id = $1;
`;

const orderPlaced = `
   UPDATE Inventory
   SET hold_quantity = hold_quantity - $2 
   WHERE product_id = $1;
`;

const getProductQuantity = `
  SELECT * FROM Inventory 
  WHERE Product_id = $1;
`;

const productQuantityIncreaseQuery = `
  UPDATE Inventory
  SET availabel_quantity  = availabel_quantity  - 1
  WHERE product_Id = $1;
`;

const productQuantityDecreseQuery = `
  UPDATE Inventory
  SET availabel_quantity  = availabel_quantity  + 1
  WHERE product_Id = $1;
`;


const getAllTheInventory = ` 
SELECT Products.product_name, Inventory.availabel_quantity, Inventory.hold_quantity, Inventory.product_id
FROM Inventory
LEFT JOIN Products ON Inventory.product_id = Products.product_id
ORDER BY Products.product_name ASC;`;

const updateInventory = `
 UPDATE Inventory
 SET availabel_quantity = availabel_quantity + $1
 WHERE product_id = $2 
`;

const deletInventory = `
 DELETE FROM Inventory 
 WHERE product_id = $1 
`;

//--------------------- query for creating new tabel in databse  DDL Query -----------------------------------------
const createTabel =
  " CREATE TABLE Users (userID  SERIAL  PRIMARY KEY, username varchar(255) , email varchar(255) , password varchar(255) , mobile INT)";

const createOrderTabel =
  "  CREATE TABLE Orders(orderId SERIAL PRIMARY KEY , customer_id INT REFERENCES Users(userID),order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,total_amount DECIMAL(10,2),status VARCHAR(50) , payment_mode VARCHAR(50) ) ";

const createOrderItme =
  "  CREATE TABLE OrderItem (order_item_id SERIAL PRIMARY KEY, order_id INT REFERENCES Orders(orderId), product_id INT ,  quantity INT, price_per_unit DECIMAL(10, 2), total_order_price DECIMAL(10, 2));  ";

const productDetailTabel =
  "  CREATE TABLE Products (product_Id SERIAL PRIMARY KEY , Product_Name VARCHAR(255) , Product_Image VARCHAR(255), Product_Price INT,  Category VARCHAR(255) , isVeged BOOLEAN DEFAULT FALSE , isNonVeged BOOLEAN DEFAULT FALSE )  ";

const invenTory =
  "CREATE TABLE Inventory (id SERIAL PRIMARY KEY , Product_id INT  , Availabel_quantity INT , Hold_quantity INT ) ";

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
  InsertProduct,
  getALLProduct,
  getCategoriesProduct,
  updateProduct,
  productQuantityIncreaseQuery,
  productQuantityDecreseQuery,
  getProductById,
  invenTory,
  disolveHoldQuantity,
  removeFromHoldQuantity,
  addHoldQuantity,
  addInventory,
  getProductQuantity,
  orderPlaced,
  getAllOrderByOrderId,
  getUserById,
  getAllCompletedOrder,
  getAllTheInventory,
  updateInventory,
  deletProduct,
  deletInventory,
  getVegProduct,
  getNonVegProduct,
};
