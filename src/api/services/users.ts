import { UserRepositoryInterface } from "../repository/users"
import { User } from "../models/users"
import { validateNewUser } from "./validations/users"

// UserServiceInterface is the interface that describes a user
// service object.
export interface UserServiceInterface {
    saveUser(user: User, callback: (err: Error | null, res: User | null) => void): void
}

// UserService is the default implementation for UserServiceInterface.
export class UserService implements UserServiceInterface {
    userRepo: UserRepositoryInterface

    constructor(userRepo: UserRepositoryInterface) {
        this.userRepo = userRepo
    }

    public saveUser(user: User, callback: (err: Error | null, res: User | null) => void): void {
        let validationErr = validateNewUser(user)
        if (validationErr) {
            callback(validationErr, null)
            return
        }
        this.userRepo.saveUser(user, (err, usr) => {
            if (err) {
                callback(err, null)
                return
            }
            callback(null, usr)
        })
    }
}
