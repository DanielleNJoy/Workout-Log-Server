require("dotenv").config();
const Express = require ("express");
const app = Express();
const dbConnection = require('./db')
app.use(require('./middleware/headers'));
const controllers = require("./controllers");

app.use(Express.json());

app.use('/test', (req, res) => {res.send('This is a message from the test endpoint on the server!')});

app.use('/user', controllers.userController);
app.use('/log', controllers.logController);
app.use(require('./middleware/jwt_validate'));

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => app.listen(process.env.PORT, () => {console.log(`[Server]: App is listening on port ${process.env.PORT}`)}))
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`)
});