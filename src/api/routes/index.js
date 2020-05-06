import { Router } from 'express';
import middleware from '../middleware';
import loginSchema from '../schema/loginSchema';
import registerSchema from '../schema/registerSchema';
import movieSchema from '../schema/movieSchema';

export default ({ tokenService, userService, movieService }) => {
    const router = Router();
    const { schemaValidation, tokenValidation } = middleware(tokenService);

    router.post('/users', schemaValidation(registerSchema), async (req, res) => {
        try {
            const params = {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password
            }
            await userService.registerUser(params);
            res.status(201).send();
        } catch (err) {
            res.status(err.code || 500).send({ errors: err.message });
        }
    });

    router.post('/login', schemaValidation(loginSchema), async (req, res) => {
        try {
            const params = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await userService.loginUser(params);
            const token = await tokenService.generateToken(user.id);
            res.status(200).send({ token });
        } catch (err) {
            res.status(err.code || 500).send({ errors: err.message });
        }
    });


    router.post('/logout', tokenValidation, async (req, res) => {
        try {
            await tokenService.invalidateToken(req.auth.token);
            res.status(200).send();
        } catch (err) {
            res.status(err.code || 500).send({ errors: err.message });
        }
    });

    router.get('/movies', tokenValidation, async (req, res) => {
        const { keyword } = req.query;
        try {
            const results = await movieService.getRemoteMovies(keyword);
            res.status(200).send(results);
        } catch (err) {
            res.status(err.code || 500).send({ errors: err.message });
        }
    });

    router.post('/movies/favorites', tokenValidation, schemaValidation(movieSchema), async (req, res) => {
        try {
            const params = {
                external_id: req.body.external_id,
                popularity: req.body.popularity,
                vote_average: req.body.vote_average,
                video: req.body.video,
                vote_count: req.body.vote_count,
                release_date: req.body.release_date,
                original_language: req.body.original_language,
                original_title: req.body.original_title,
                adult: req.body.adult,
                overview: req.body.overview,
                suggestionScore: req.body.suggestionScore,
                user_id: req.auth.userId
            }

            const results = await movieService.addFavoriteMovie(params);
            res.status(201).send(results);
        } catch (err) {
            res.status(err.code || 500).send({ errors: err.message });
        }
    });


    router.get('/movies/favorites', tokenValidation, async (req, res) => {
        try {
            const results = await movieService.getFavoriteMovies(req.auth.userId);
            res.status(200).send(results);
        } catch (err) {
            res.status(err.code || 500).send({ errors: err.message });
        }
    });

    router.get('/', (req, res) => {
        res.status(200).send({ version: process.env.VERSION });
    });

    router.use('*', (req, res) => {
        res.status(404).send();
    });


    return router;
}