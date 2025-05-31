const express = require('express');
const { DBConnection } = require('./config/DataBase');
const FormRoutes = require("./routes/FormRoutes");
const cloudinary = require("./config/cloudinary");
const fileupload=require("express-fileupload")
const cors = require('cors');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

DBConnection();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

cloudinary.cloudinaryConnect();
app.use("/api/v1/forms", FormRoutes);


app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your Server is up and running"
    });
});

app.listen(PORT, () => {
    console.log(`App is Listening on PORT : ${PORT}`);
});
