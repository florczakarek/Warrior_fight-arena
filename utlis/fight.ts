import {WarriorRecord} from "../records/warrior.record";

export const fight = (warrior1: WarriorRecord, warrior2: WarriorRecord): {
    log: string[],
    winner: WarriorRecord
} => {
    const log: string[] = []

    const warrior1Obj = {
        hp: warrior1.stamina * 10,
        dp: warrior1.defence,
        warrior: warrior1
    }
    const warrior2Obj = {
        hp: warrior1.stamina * 10,
        dp: warrior1.defence,
        warrior: warrior2
    }

    let attacker = warrior1Obj
    let defender = warrior2Obj
//WALKA
    do {
        const attackStrength = attacker.warrior.power

        log.push(`${attacker.warrior.name} will attack ${defender.warrior.name} with strength of ${attackStrength}`)

        if (defender.dp + defender.warrior.agility > attackStrength) {

            log.push(`${defender.warrior.name} can defend before  ${attacker.warrior.name}`)
            defender.dp -= attackStrength

            if (defender.dp < 0) {
                log.push(`${attacker.warrior.name} broke ${defender.warrior.name} defence and hit ${-defender.dp} damages`)
                defender.hp += defender.dp;
            }
        } else {
            log.push(`${attacker.warrior.name} hit ${attackStrength} damages to ${defender.warrior.name}`)
            defender.hp -= attackStrength
        }

        //zamiana wojownikow
        [defender, attacker] = [attacker, defender]


    } while (defender.hp > 0);
//wytypowanie zwyciezcy
    const winner = defender.warrior;
    log.push(`${winner.name} has won`)

    return {
        log, winner
    };

}