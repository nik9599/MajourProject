const { Server } = require("socket.io");
const db = require("../database/database.js");
const { getAllActiveOrder } = require("../app/Query/query.js");

function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3001"],
      methods: ["GET", "POST", "PUT"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("order-Placed", (orderId) => {
      db.pool.query(getAllActiveOrder, (err, result) => {
        if (err) {
          console.error("Error executing database query:", err);
          return;
        }
        io.emit("new-order", result.rows);
      });
    });

    socket.on("get-the-order", (orderId) => {
      db.pool.query(getAllActiveOrder, (err, result) => {
        if (err) {
          console.error("Error executing database query:", err);
          return;
        }
        io.emit("new-order1", result.rows);
      });
    });
  });
}

module.exports = initializeSocket;
