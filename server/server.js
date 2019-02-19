const express = require("express");
const app = new express();
const port = "3000";
const path = require("path");

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
