const express = require("express")
const { Sequelize } = require("sequelize")
const cors = require("cors")
const port = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the recipe search react API"
    })
})

app.use("/recipes", require("./controllers/recipes_controller"))

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})