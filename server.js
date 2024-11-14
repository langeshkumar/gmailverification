import express, { json } from "express";
import gmaildatabase from "./lib/database.js";
import emailRouter from "./Router/emailverification.router.js";

const app = express();
const PORT = "3001";

// understand json request in postman
app.use(express.json());

// understand urlencoded request in postman
app.use(express.urlencoded({ extended: true }));

// sample Router
app.get('/', (req, res) => {
    res.send({ message: "Server is running..!" });
});

// database connection
gmaildatabase();

// use middleware router 
app.use('/emailverify', emailRouter);

// post connection 
app.listen(PORT, () => {
    console.log(`Server is getting ready to http://localhost:${PORT}`);
});