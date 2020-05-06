import axios from 'axios';
import { MovieException } from '../exception/movieException';

export class MovieService {
    constructor(repository) {
        this.repository = repository;
    }

    async getRemoteMovies(keyword) {
        try {
            const opts = {
                'headers': {
                    'Authorization': `Bearer ${process.env.TMDB_API_KEY}`
                }
            }
            const endpoint = keyword
                ? `${process.env.TMDB_API_SEARCH_ENDPOINT}?query=${keyword}`
                : process.env.TMDB_API_DISCOVER_ENDPOINT;
            //Callout to external service
            const response = await axios.get(`${process.env.TMDB_API_URL}/${endpoint}`, opts);
            const data = response.data.results;
            //Process results
            data.forEach(x => {
                x.suggestionScore = Math.floor(Math.random() * 99);
                x.external_id = x.id;
                delete x.id;
                delete x.genre_ids;
                delete x.poster_path;
                delete x.backdrop_path;
            });
            //Sort results by suggestionScore ascending
            data.sort((x, y) => {
                return x.suggestionScore - y.suggestionScore;
            });

            return data;
        } catch (err) {
            console.error(err);
            throw new MovieException('Could not fetch movies', 500);
        }
    }

    async getFavoriteMovies(userId) {
        const results = await this.repository.getUserFavorites(userId);
        //Convert boolean fields and add suggestionForTodayScore
        results.forEach((x) => {
            x.video = !!x.video;
            x.adult = !!x.adult;
            x.suggestionForTodayScore = Math.floor(Math.random() * 99);
        });
        //Sort results by suggestionForTodayScore ascending
        results.sort((x, y) => {
            return x.suggestionForTodayScore - y.suggestionForTodayScore;
        });

        return results;
    }

    async addFavoriteMovie(params) {
        let exists = await this.repository.exists(params.external_id);
        if (exists.value) {
            throw new MovieException('Movie exists', 400);
        }
        await this.repository.add(params);
    }
}

