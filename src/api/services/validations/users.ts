import { User } from "../../models/users";
import { isNumber, isString } from "./types-validation"

function validateNewUser(user: User): Error | null {
    if (!isNumber(user.age) || user.age <= 0) {
        return new Error("invalid age")
    }
    if (!isString(user.fullName) || user.fullName === "") {
        return new Error("invalid full name")
    }
    if (!isString(user.email) || user.email === "") {
        return new Error("invalid email")
    }
    if (!isString(user.phoneNumber) || user.phoneNumber === "") {
        return new Error("invalid phone number")
    }
    if (!isString(user.password) || user.password === "") {
        return new Error("invalid password")
    }
    if (!isString(user.userName) || user.userName === "") {
        return new Error("invalid username")
    }
    return null
}

export { validateNewUser }