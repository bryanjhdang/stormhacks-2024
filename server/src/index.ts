// src/index.js
import express, { Express, Request, Response } from "express";
import { createServer } from 'node:http';
import dotenv from "dotenv";
import cors from "cors";
import { Server, Socket } from "socket.io"
import { userController } from "./controllers/user.controller";
import { Game, result } from "./models/Game";
const axios = require('axios').default;

var gameList: Game[] = []

dotenv.config();
const app: Express = express();

const todayRaw = new Date();
const dd = String(todayRaw.getDate()).padStart(2, '0');
const mm = String(todayRaw.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = todayRaw.getFullYear();

const today = String(yyyy + '-' + mm + '-' + dd);

const yesterdayRaw = new Date(todayRaw);
yesterdayRaw.setDate(yesterdayRaw.getDate() - 1);
const ydd = String(yesterdayRaw.getDate()).padStart(2, '0');
const ymm = String(yesterdayRaw.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyyy = yesterdayRaw.getFullYear();
const yesterday = String(yyyyy + '-' + ymm + '-' + ydd);

const tomorrowRaw = new Date();
const tdd = String(tomorrowRaw.getDate() + 1).padStart(2, '0');
const tmm = String(tomorrowRaw.getMonth() + 1).padStart(2, '0'); //January is 0!
const tyyyy = tomorrowRaw.getFullYear();
const tomorrow = String(tyyyy + '-' + tmm + '-' + tdd);


const port = process.env.PORT || 8080;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }}
);


app.use(cors());
app.use(express.json());

app.get(`/`, (req: Request, res: Response) => {
  res.send("It's working!");
});

app.get('/user', userController);

axios
  .get("https://api-web.nhle.com/v1/score/now")
  .then(function (response : any) {
    //console.log(response.data.games);
    response.data.games.forEach((element : any) => {
      console.log(element);
      var newGame = new Game(
        element.id, 
        `${element.awayTeam.name.default} @ ${element.homeTeam.name.default}`,
        element.gameDate,
        element.awayTeam.abbrev,
        element.awayTeam.score || 0,
        element.homeTeam.abbrev,
        element.homeTeam.score || 0,
        (element.gameState === `OFF` && element.awayTeam.score === 0 && element.homeTeam.score === 0) || (element.gameState === `ON`) ? result.INCOMPLETE : 
        (element.awayTeam.score > element.homeTeam.score ? result.AWAY : result.HOME)
      )
      gameList.push(newGame);
    });
    console.log(gameList)
  });

  const fetchNextDaysData = async () => {
    try {
      const response = await axios.get("https://api.github.com/users/mapbox");
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

server.listen(port, () => {
  console.log(today);
  console.log(yesterday);
  console.log(tomorrow);
  console.log(`[server]: Server is running at http://localhost:${port}`);
});