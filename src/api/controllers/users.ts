import { Application, Request, Response } from "express"
import { UserServiceInterface } from "../services/users";
import { User } from "../models/users"
import { ResponseStatus, StatusCodes } from "../models/http"
import { Tracer } from "opentracing";

// UserController is the users resource rest api controller.
export class UserController {
    userService: UserServiceInterface
    tracer: Tracer

    constructor(userService: UserServiceInterface, tracer: Tracer) {
        this.userService = userService
        this.tracer = tracer
    }

    public initRoutes(router: Application) {
        router.route("/users/")
            .post(this.createUser.bind(this))
    }

    public createUser(req: Request, res: Response): void {
        let newUser: User = req.body
        this.userService.saveUser(newUser, (err, user) => {
            if (err) {
                res.status(StatusCodes.StatusBadRequest).
                    json({ status: ResponseStatus.Error, message: err.message })
                return
            }
            res.json({ status: ResponseStatus.Success, message: "user added successfully", user })
        })
    }
}