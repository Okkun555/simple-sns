const express = require("express");
const app = express();
const PORT = 8010;

app.get("/", (req, res) => {
  res.send("<h1>Hello world!!</h1>")
})

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))