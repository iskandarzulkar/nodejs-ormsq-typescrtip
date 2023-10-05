import express, {Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/Routes";

const app = express();
app.use(express.json());

function helloWord(){
    return "Hello Selamat Datang Iskandar Zulkarnain (-_-) !";
}

app.get("/", (req: Request, res: Response) => {
    return res.status(200).send({
        response: helloWord()
    })
})

app.use(router)

app.listen(process.env.APP_PORT, () =>{
    console.log("Run on port ", process.env.APP_PORT);
})