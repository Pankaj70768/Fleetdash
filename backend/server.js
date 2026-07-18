require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`🚀 FleetDash Server Running on Port ${PORT}`);
});