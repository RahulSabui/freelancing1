
const express = require('express')
const cors = require("cors");

const app = express()
const port = 8000

const indexRouter = require('./Router/index');
const DetailRouter = require('./Router/details');
const userRouter = require("./Router/user")

const whitelist =
  "http://localhost:3000,http://localhost:3001";
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({
  limit: '110mb',
  extended: true
}));

app.use('/api',indexRouter)
app.use('/api/user',userRouter)
app.use('/api',DetailRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})