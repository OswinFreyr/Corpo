const express = require("express");
const cors = require("cors");
const { db } = require("./models/db");

const userRouter = require("./routes/userRoute");


const app = express();
const PORT = 2000;
app.use(cors({
    origin: 'http://localhost:4000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json({limit: "2mb"}));

app.use("/api/v1/users",userRouter);


db.sync(/*{force : true}*/)
    .then(async () => {
            app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    });
