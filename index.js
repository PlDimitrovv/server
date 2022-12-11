const express = require('express')
const expressConfig = require('./config/express')
const databaseConfig = require('./config/database')
const routesConfig = require('./config/routes')


start()


async function start(){
const app = express()

expressConfig(app);
await databaseConfig(app)
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
routesConfig(app)

app.listen(3000, () => console.log('Server listening on port 3000'));
}