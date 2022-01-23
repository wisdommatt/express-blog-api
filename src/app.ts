import express, { Application, Request, Response } from "express"
import { Db, MongoClient } from "mongodb"
import { User } from "./api/models/users"
import { UserRepository } from "./api/repository/users"
import { UserService } from "./api/services/users"

let mongoClient: MongoClient = new MongoClient("mongodb://localhost:27017")
mongoClient.connect()

let mongoDB: Db = mongoClient.db("express-blog")
let app: Application = express()

app.use(express.json())

let userRepo: UserRepository = new UserRepository(mongoDB)
let userService: UserService = new UserService(userRepo)

app.post("/users/", (req: Request, res: Response) => {
    let newUser: User = req.body
    userService.saveUser(newUser, (err, user) => {
        console.log(err, err === undefined)
        if (err) {
            res.status(400)
            res.json({ status: "error", message: err.message })
            return
        }
        res.json({ status: "success", message: "user added successfully", user })
    })
})

let port: number = Number(process.env.PORT) || 4141

app.listen(port, () => {
    console.log(`app running on port: ${port}`)
})
