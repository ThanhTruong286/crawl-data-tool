import express from 'express';
import home_controller from '../controllers/home_controller.js';

let router = express.Router();

let initWebRoute = (app) => {
    router.get('/', home_controller.get_home);

    return app.use('/', router);
}

export default initWebRoute;