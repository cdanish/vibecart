const express = require("express")
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require("./config/DB");
const router = require("./routes/index")
const cookieParser = require('cookie-parser');


const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json({ limit: '10mb',extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

//db connected
connectDB();

//Router
app.use("/api",router);

const PORT = 8080 || process.env.PORT;

app.listen(PORT,()=>{
    console.log("server running");
})