import { Game } from "../models/Game";
import { User } from "../models/User";

export class HockeyHelper {
    async getGames(teams : string[], begin: Date, end: Date) : Promise<Game[]> {
        return new Promise<Game[]>((resolve, reject) => {
            resolve([]);
        });
    }
}

const hockeyHelper = new HockeyHelper();

export { hockeyHelper };