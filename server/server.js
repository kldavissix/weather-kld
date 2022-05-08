const express = require("express")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const PORT = process.env.PORT || 5000

const app = express()

// Rate limiting
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 75,
})

app.use(limiter)
app.set("trust proxy", 1)

// Routes

app.use("/api", require("./routes/index"))
app.use(cors())

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
