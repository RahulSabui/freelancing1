
const express = require('express')
const app = express()
const port = 3000

const indexRouter = require('./Router/index');
const DetailRouter = require('./Router/details');
const userRouter = require("./Router/user")


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