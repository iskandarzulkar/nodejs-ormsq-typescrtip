import express, {Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();


const app = express();


function helloWord(){
    return "Hello Selamat Datang Iskandar Zulkarnain (-_-) !";
}

app.get("/", (req: Request, res: Response) => {
    return res.status(200).send({
        response: helloWord()
    })
})

app.listen(process.env.APP_PORT, () =>{
    console.log("Run on port ", process.env.APP_PORT);
})