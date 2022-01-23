import { Application, Request, Response } from "express"
import { UserServiceInterface } from "../services/users";
import { User } from "../models/users"
import { ResponseStatus, StatusCodes } from "../models/http"

// UserController is the users resource rest api controller.
export class UserController {
    userService: UserServiceInterface

    constructor(userService: UserServiceInterface) {
        this.userService = userService
    }

    initRoutes(router: Application) {
        router.route("/users/")
            .post(this.createUser.bind(this))
    }

    createUser(req: Request, res: Response): void {
        let newUser: User = req.body
        this.userService.saveUser(newUser, (err, user) => {
            if (err) {
                res.status(StatusCodes.StatusBadRequest)
                res.json({ status: ResponseStatus.Error, message: err.message })
                return
            }
            res.json({ status: ResponseStatus.Success, message: "user added successfully", user })
        })
    }
}