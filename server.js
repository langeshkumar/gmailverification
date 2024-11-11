import express from "express"
import gmaildatabase from "./lib/database.js";

const app = express();
const PORT = "3001";

// sample Router
app.get('/', (req, res) => {
    res.send({ message: "Server is running..!" });
});

// database connection
gmaildatabase();

// post connection 
app.listen(PORT, () => {
    console.log(`Server is getting ready to http://localhost:${PORT}`);
});