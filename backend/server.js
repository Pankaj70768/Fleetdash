const http = require("http");
const app = require("./app");
const connectDB = require("./src/config/database");
const { Server } = require("socket.io");
const { initializeSocket } = require("./src/socket/socket");

require("dotenv").config();

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

initializeSocket(io);

io.on("connection", (socket) => {
    console.log(`🟢 Client Connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`🔴 Client Disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 FleetDash Server Running on Port ${PORT}`);
});