import express, { Express, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import * as controller from "./controller";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 6969;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/data/', routes);

app.get('/', (req, res) => {
    res.send('Successful response.');
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});