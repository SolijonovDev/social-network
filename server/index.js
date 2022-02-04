require("dotenv").config()
const mongoose = require('mongoose');
const express = require("express")
const router=require("./router/index.js")
const cors = require("cors")
const path=require("path")
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const { createServer }=require("http");
const { Server }=require("socket.io");

const app = express()
const PORT = process.env.PORT || 4000

const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(express.json())
app.use(cookieParser());
app.use(fileUpload({}))
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use("/api",router)

app.use(express.static(path.resolve(__dirname, 'static')));


io.on("connection", (socket) => {
    console.log("socket",socket.id);
  });

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        httpServer.listen(PORT,()=>console.log(`Server started port:${PORT}`));
        // app.listen(PORT, () => console.log(`Server started port:${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start()