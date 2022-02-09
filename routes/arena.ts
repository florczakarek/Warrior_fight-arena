import {Router} from "express";


export const arenaRouter = Router()

arenaRouter
    .get('/fight-form', (req, res) => {
        res.send('Fight form')
    })
    .post('/fight', (req, res) => {
        res.send('Lets fight')
    })