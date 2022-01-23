import express, { Application, Request, Response } from "express"

let app: Application = express()

app.get("/", (req: Request, res: Response) => {
    res.json("welcome")
});

let port: number = Number(process.env.PORT) || 4141

app.listen(port, () => {
    console.log(`app running on port: ${port}`)
})