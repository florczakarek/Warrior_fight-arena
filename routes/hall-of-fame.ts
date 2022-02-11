import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";


export const hallOfFameRouter = Router()

hallOfFameRouter
    .get('/', async (req, res) => {
        const topWarriors = (await WarriorRecord.listTop(4))
            .map((warrior,idx)=>{
            return{
                place:idx + 1,
                warrior
            }
        });
        res.render('hall-of-fame/list',{
            topWarriors
        })
    })
