const express = require("express");
const cors = require("cors");
const { db } = require("./models/db");

const answerLRouter = require("./routes/answerLRoute");
const answerRRouter = require("./routes/answerRRoute");
const questionRouter = require("./routes/questionRoute");
const reasonRouter = require("./routes/reasonRoute");
const roleRouter = require("./routes/roleRoute");
const userRouter = require("./routes/userRoute");


const app = express();
const PORT = 2000;
app.use(cors({
    origin: 'http://localhost:4000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json({limit: "2mb"}));

app.use("/api/v1/answerLs",answerLRouter);
app.use("/api/v1/answerRs",answerRRouter);
app.use("/api/v1/questions",questionRouter);
app.use("/api/v1/reasons",reasonRouter);
app.use("/api/v1/roles",roleRouter);
app.use("/api/v1/users",userRouter);


db.sync(/*{force : true}*/)
    .then(async () => {
            app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    });
