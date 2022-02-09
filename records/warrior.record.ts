import {ValidationError} from "../utlis/error";

export class WarriorRecord {
    public id?: string;
    /**
     * Name is unique
     * ```
     * const obj = new WarriorRecord()
     * ```
     */
    public readonly name: string;
    public readonly power: number;
    public readonly defence: number;
    public readonly stamina: number;
    public readonly agility: number;
    public wins: number;

    constructor(obj: WarriorRecord) {

        const {id, name, power, defence, agility, stamina, wins} = obj;

        const sum = [power, defence, agility, stamina].reduce((prev, curr) => prev + curr, 0)
        //sprawdzenie na backendzie
        if (sum !== 10) {
            throw new ValidationError(`Sum of all stats must equal ${sum}`)
        }
        if (name.length < 3 && name.length > 50) {
            throw new ValidationError(`Name must have from 3 to 50 characters. Now it is ${name.length}`)
        }

        this.id = id;
        this.name = name;
        this.power = power;
        this.defence = defence;
        this.stamina = stamina;
        this.agility = agility;
        this.wins = wins;

    }


    async insert() {
    }

    async update() {
    }

//dopiero szukamy dlatego static
    static async getOne(id: string) {
    }

    static async listTop(topCount: number) {
    }

}
