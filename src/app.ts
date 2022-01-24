import express, { Application } from "express"
import { Db, MongoClient } from "mongodb"
import { Tracer } from "opentracing"
import { TracingConfig, TracingOptions, initTracerFromEnv, opentracing } from "jaeger-client"
import { UserController } from "./api/controllers/users"
import { UserRepository } from "./api/repository/users"
import { UserService } from "./api/services/users"

let mongoClient: MongoClient = new MongoClient("mongodb://localhost:27017")
mongoClient.connect()

let mongoDB: Db = mongoClient.db("express-blog")
let app: Application = express()

app.use(express.json())

let appTracer = initTracer("express-blog-api")
opentracing.initGlobalTracer(appTracer)

let userRepo: UserRepository = new UserRepository(mongoDB)
let userService: UserService = new UserService(userRepo)
let userController: UserController = new UserController(userService, initTracer("user-controller"))

userController.initRoutes(app)

function initTracer(serviceName: string): Tracer {
    return initJaegerTracer(serviceName)
}

function initJaegerTracer(serviceName: string): Tracer {
    const config: TracingConfig = {
        serviceName: serviceName,
        sampler: {
            type: "const",
            param: 1,
        },
        reporter: {
            logSpans: true,
        }
    }
    const options: TracingOptions = {}
    return initTracerFromEnv(config, options)
}

let port: number = Number(process.env.PORT) || 4141
app.listen(port, () => {
    console.log(`app running on port: ${port}`)
})
