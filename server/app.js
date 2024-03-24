const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const Routes = require("./src/app/routes/routes.js");
const { createServer } = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const {getAllActiveOrder}  = require("./src/app/Query/query.js");
const db = require("./src/database/database.js");

require("dotenv").config();

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", Routes);

app.use("/getImage", express.static("public/Images"));

//-------------------------------------setting up socket.io------------------------------

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

const handleGetNewOrder = async (token, callback) => {
    try {
      const resp = await axios.get("http://localhost:8080/api/v1/activeOrder", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
  
      callback({ data: resp.data });
    } catch (error) {
      callback({ error: error.message });
    }
  };

  const getActiveOrder = (callback) => {
    
    db.pool.query(getAllActiveOrder, async (err, result) => {
      if (err) {
        console.log(`Error while get active order => ${err.message}`);
      } else {
        if (typeof callback === 'function') {
          callback({ data: result.rows });
        } else {
          console.error('Callback is not a function');
        }
      }
    });
  };
  
  io.on("connection", (socket) => {
    socket.once("getnewOrder", (callback) => {

       callback({
        
      data :getActiveOrder(async(callback) => {
        socket.emit("activeOrderData", await callback);
      })
    })
    });
  });
  

module.exports = httpServer;
