import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utlis/error";
import {fight} from "../utlis/fight";


export const arenaRouter = Router()

arenaRouter
    .get('/fight-form', async (req, res) => {
        const allWarriors = await WarriorRecord.getAll()
        res.render('arena/fight-form', {
            allWarriors
        })
    })
    .post('/fight', async (req, res) => {
        const {warrior1: warrior1Id, warrior2: warrior2Id} = req.body
        if (warrior1Id === warrior2Id) {
            throw new ValidationError('You have to choose two different warriors')
        }

        const warrior1 = await WarriorRecord.getOne(warrior1Id)
        const warrior2 = await WarriorRecord.getOne(warrior2Id)

        if (!warrior1) {
            throw new ValidationError('Brak zawodnika nr 1 w bazie danych')
        }
        if (!warrior2) {
            throw new ValidationError('Brak zawodnika nr 2 w bazie danych')
        }


        const {log, winner} = fight(warrior1, warrior2)
        console.log({log})
        console.log(winner)


        winner.wins++;
        await winner.update()

        res.render('arena/fight', {
            log
        })
    })