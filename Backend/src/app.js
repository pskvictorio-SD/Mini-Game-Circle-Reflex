import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// Configuración de entorno
dotenv.config()
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Rutas
import routerUsers from "./routes/users.route.js"
app.use("/api/users", routerUsers)

import routerScores from "./routes/scores.route.js"
app.use("/api/scores", routerScores)

// Puerto
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`)
})
