// index.js
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const blogRouter = require("./routes/router");

const app = express();
const port = 5000;

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use("/", blogRouter);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
