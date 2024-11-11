import express from "express"

const app = express();
const PORT = "3001";

// sample Router
app.get('/', (req, res) => {
    res.send({ message: "Server is running..!" });
});

app.listen(PORT, () => {
    console.log(`Server is getting ready to http://localhost:${PORT}`);
});