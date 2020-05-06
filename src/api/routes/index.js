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
            await userService.registerUser(req.body);
            res.status(201).send();
        } catch (err) {
            res.status(err.code || 500).send({ errors: err.message });
        }
    });

    router.post('/login', schemaValidation(loginSchema), async (req, res) => {
        try {
            const user = await userService.loginUser(req.body);
            const token = tokenService.generateToken(user.id);
            res.status(201).send({ token });
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
            const results = await movieService.addFavoriteMovie({ ...req.body, user_id: req.auth.userId });
            res.status(200).send(results);
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