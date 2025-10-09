import express from "express";
import router from "./routes/shortener.routes.js";

const app = express()

const PORT = 3000

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(router)

app.set("view engine","ejs")

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})