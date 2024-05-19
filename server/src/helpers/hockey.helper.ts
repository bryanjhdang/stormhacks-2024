import { Game, result } from "../models/Game";
import { User } from "../models/User";
const axios = require("axios").default;
const todayRaw = new Date();
const dd = String(todayRaw.getDate()).padStart(2, "0");
const mm = String(todayRaw.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = todayRaw.getFullYear();

const today = String(yyyy + "-" + mm + "-" + dd);

const yesterdayRaw = new Date(todayRaw);
yesterdayRaw.setDate(yesterdayRaw.getDate() - 1);
const ydd = String(yesterdayRaw.getDate()).padStart(2, "0");
const ymm = String(yesterdayRaw.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyyy = yesterdayRaw.getFullYear();
const yesterday = String(yyyyy + "-" + ymm + "-" + ydd);

const tomorrowRaw = new Date();
const tdd = String(tomorrowRaw.getDate() + 1).padStart(2, "0");
const tmm = String(tomorrowRaw.getMonth() + 1).padStart(2, "0"); //January is 0!
const tyyyy = tomorrowRaw.getFullYear();
const tomorrow = String(tyyyy + "-" + tmm + "-" + tdd);

export class HockeyHelper {
  async getGames(teams: string[]): Promise<Game[]> {
    const teamGameList: Game[] = [];
    const teamPromises = teams.map(async (team) => {
      try {
        // in future, we add compatibility to see past seasons based on a specified date (change the 20232024 part of URL)
        const response = await axios.get(
          `https://api-web.nhle.com/v1/club-schedule-season/${team}/20232024`
        );
        response.data.games.forEach((element: any) => {
          if (!teamGameList.some((game) => game.id === element.id)) {
            const newGame = new Game(
              element.id,
              `${element.awayTeam.placeName.default} @ ${element.homeTeam.placeName.default}`,
              element.gameDate,
              element.awayTeam.abbrev,
              element.awayTeam.score || 0,
              element.homeTeam.abbrev,
              element.homeTeam.score || 0,
              (element.gameState === "OFF" &&
                element.awayTeam.score === 0 &&
                element.homeTeam.score === 0) ||
              element.gameState === "ON"
                ? result.INCOMPLETE
                : element.awayTeam.score > element.homeTeam.score
                ? result.AWAY
                : result.HOME
            );
            teamGameList.push(newGame);
          }
          //}
        });
      } catch (error) {
        console.error(`Error fetching schedule for team ${team}:`, error);
      }
    });

    await Promise.all(teamPromises);
    teamGameList.sort((a, b) => new Date(a.gameTime).getTime() - new Date(b.gameTime).getTime());
    return teamGameList;
  }

  async getAllTodaysResults(): Promise<Game[]> {
    var teamGameList: Game[] = [];
    try {
      // in future, we add compatibility to see past seasons based on a specified date (change the 20232024 part of URL)
      const response = await axios.get(`https://api-web.nhle.com/v1/score/now`);
      response.data.games.forEach((element: any) => {
        const newGame = new Game(
          element.id,
          `${element.awayTeam.name.default} @ ${element.homeTeam.name.default}`,
          element.gameDate,
          element.awayTeam.abbrev,
          element.awayTeam.score || 0,
          element.homeTeam.abbrev,
          element.homeTeam.score || 0,
          (element.gameState === `OFF` &&
            element.awayTeam.score === 0 &&
            element.homeTeam.score === 0) ||
          element.gameState === `ON`
            ? result.INCOMPLETE
            : element.awayTeam.score > element.homeTeam.score
            ? result.AWAY
            : result.HOME
        );
        teamGameList.push(newGame);
        //}
      });
    } catch (error) {
      console.error(`Error fetching schedule:`, error);
    }
    await Promise.all(teamGameList);
    teamGameList.sort((a, b) => new Date(a.gameTime).getTime() - new Date(b.gameTime).getTime());
    console.log(teamGameList);
    return teamGameList;
  }

  async getTomorrowsResults(): Promise<Game[]> {
    const teamGameList: Game[] = [];
    try {
      // in future, we add compatibility to see past seasons based on a specified date (change the 20232024 part of URL)
      const response = await axios.get(`https://api-web.nhle.com/v1/score/${tomorrow}`);
      response.data.games.forEach((element: any) => {
        const newGame = new Game(
          element.id,
          `${element.awayTeam.name.default} @ ${element.homeTeam.name.default}`,
          element.gameDate,
          element.awayTeam.abbrev,
          element.awayTeam.score || 0,
          element.homeTeam.abbrev,
          element.homeTeam.score || 0,
          result.INCOMPLETE
        );
        teamGameList.push(newGame);
        //}
      });
    } catch (error) {
      console.error(`Error fetching schedule:`, error);
    }
    await Promise.all(teamGameList);
    teamGameList.sort((a, b) => new Date(a.gameTime).getTime() - new Date(b.gameTime).getTime());
    console.log(teamGameList);
    return teamGameList;
  }

  async getYesterdaysResults(): Promise<Game[]> {
    const teamGameList: Game[] = [];
    try {
      // in future, we add compatibility to see past seasons based on a specified date (change the 20232024 part of URL)
      const response = await axios.get(`https://api-web.nhle.com/v1/score/${yesterday}`);
      response.data.games.forEach((element: any) => {
        const newGame = new Game(
          element.id,
          `${element.awayTeam.name.default} @ ${element.homeTeam.name.default}`,
          element.gameDate,
          element.awayTeam.abbrev,
          element.awayTeam.score || 0,
          element.homeTeam.abbrev,
          element.homeTeam.score || 0,
          (element.gameState === `OFF` &&
            element.awayTeam.score === 0 &&
            element.homeTeam.score === 0) ||
          element.gameState === `ON`
            ? result.INCOMPLETE
            : element.awayTeam.score > element.homeTeam.score
            ? result.AWAY
            : result.HOME
        );
        teamGameList.push(newGame);
        //}
      });
    } catch (error) {
      console.error(`Error fetching schedule:`, error);
    }
    await Promise.all(teamGameList);
    teamGameList.sort((a, b) => new Date(a.gameTime).getTime() - new Date(b.gameTime).getTime());
    console.log(teamGameList);
    return teamGameList;
  }
}

// VAN, EDM, CGY

const hockeyHelper = new HockeyHelper();

export { hockeyHelper };
