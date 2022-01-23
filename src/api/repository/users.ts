import { Db, Collection, ObjectId, AnyError, InsertOneResult, ObjectID } from "mongodb"
import { User } from "../models/users"

// UserRepositoryInterface is the interface that defines a
// user repository.
export interface UserRepositoryInterface {
    saveUser(user: User, callback: (err: Error | null, res: User | null) => void): void
}

// UserRepository is the default implementation for UserRepositoryInterface
// interface.
export class UserRepository implements UserRepositoryInterface {
    collection: Collection

    constructor(mongoDB: Db) {
        this.collection = mongoDB.collection("users")
    }

    saveUser(user: User, callback: (err: Error | null, res: User | null) => void): void {
        user._id = new ObjectId().toHexString()
        user.timeAdded = new Date()
        user.lastUpdated = new Date()
        this.collection.insertOne(user, (err, res) => {
            if (err) {
                callback(err, null)
                return
            }
            user.id = new ObjectId(res?.insertedId).toHexString()
            callback(null, user)
        })
    }
}