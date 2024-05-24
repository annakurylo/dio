const express = require("express")
const mongoose = require("mongoose")
const authRouter = require("./routers/authRouter")
const telemetryRouter = require("./routers/telemetryRouter")

const PORT = 5001

// const Role = require("./models/Role");
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRouter)
app.use("/", telemetryRouter)



const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }



const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://annakurylo:1124@cluster0.qs3x4kv.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`,
      clientOptions,
    )
    await mongoose.connection.db.admin().command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!")

    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()





// const role = new Role({value: "Admin"});
// role.save();
