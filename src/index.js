import express from 'express';
import configViewEngine from './config/view_engine.js';
import initWebRoute from './routes/web.js';
import home_controller from './controllers/home_controller.js';

//construct app
const app = express();
//config view engine
configViewEngine(app);

initWebRoute(app);

home_controller.crawlData();
//default port
const port = 3000;

//start the server
app.listen(port, () => {
    console.log('is running on port ' + port);
})