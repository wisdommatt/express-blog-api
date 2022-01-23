import express, { Application } from "express"
import { Db, MongoClient } from "mongodb"
import { UserController } from "./api/controllers/users"
import { UserRepository } from "./api/repository/users"
import { UserService } from "./api/services/users"

let mongoClient: MongoClient = new MongoClient("mongodb://localhost:27017")
mongoClient.connect()

let mongoDB: Db = mongoClient.db("express-blog")
let app: Application = express()

app.use(express.json())

let userRepo: UserRepository = new UserRepository(mongoDB)
let userService: UserService = new UserService(userRepo)
let userController: UserController = new UserController(userService)

userController.initRoutes(app)

let port: number = Number(process.env.PORT) || 4141
app.listen(port, () => {
    console.log(`app running on port: ${port}`)
})
