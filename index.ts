import * as express from "express";
import 'express-async-errors';
import * as methodOverride from "method-override";
import {static as eStatic, urlencoded} from "express";
import {engine} from "express-handlebars";
import {homeRouter} from "./routes/home";
import {warriorRouter} from "./routes/warrior";
import {arenaRouter} from "./routes/arena";
import {hallOfFameRouter} from "./routes/hall-of-fame";
import './utlis/db'
import {WarriorRecord} from "./records/warrior.record";
import {handleError} from "./utlis/error";

const app = express();


app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true
}));
app.use(eStatic('public'))
app.engine('.hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', '.hbs')


app.use('/', homeRouter)
app.use('/warrior', warriorRouter)
app.use('/arena', arenaRouter)
app.use('/hall-of-fame', hallOfFameRouter)


app.use(handleError)

app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000')
})