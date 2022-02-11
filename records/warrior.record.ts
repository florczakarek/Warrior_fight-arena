import {ValidationError} from "../utlis/error";
import {v4 as uuid} from 'uuid';
import {pool} from "../utlis/db";
import {FieldPacket} from "mysql2";


type WarriorRecordResult = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {
    public id?: string;
    /**
     * Name is unique
     * ```
     * const obj = new WarriorRecord()
     * ```
     */
    public wins?: number;
    public readonly name: string;
    public readonly power: number;
    public readonly defence: number;
    public readonly stamina: number;
    public readonly agility: number;

    constructor(obj: Omit<WarriorRecord, 'insert' | 'update'>) {

        const {id, name, power, defence, agility, stamina, wins} = obj;
        const stats = [power, defence, agility, stamina]
        const sum = stats.reduce((prev, curr) => prev + curr, 0)
        //sprawdzenie na backendzie

        if (sum !== 10) {
            throw new ValidationError(`Sum of all stats must equal 10. Actually it is ${sum}`)
        }
        if (name.length < 3 && name.length > 50) {
            throw new ValidationError(`Name must have from 3 to 50 characters. Now it is ${name.length}`)
        }

        for (const stat of stats) {
            if (stat < 1) {
                throw new ValidationError('All the stats must be equal at least 1. Checkout your configuration')
            }
        }

        this.id = id ?? uuid();
        this.wins = wins ?? 0;
        this.name = name;
        this.power = power;
        this.defence = defence;
        this.stamina = stamina;
        this.agility = agility;

    }


    async insert(): Promise<string> {

        await pool.execute("INSERT INTO `warriors` (`id`,`name`, `power`, `defence`,`stamina`, `agility`,`wins`) VALUES (:id, :name, :power, :defence, :stamina, :agility, :wins)", {
            id: this.id,
            name: this.name,
            power: this.power,
            defence: this.defence,
            stamina: this.stamina,
            agility: this.agility,
            wins: this.wins,
        })
        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `warriors` SET `wins`=:wins WHERE `id`=:id", {
            id:this.id,
            wins: this.wins,
        })
    }

//dopiero szukamy dlatego static - nie dotyczy konkretnego warriora(nie uzywamy this!!!) musi go dopiro zwrocic
    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [result] = await pool.execute("SELECT * FROM `warriors` WHERE `id`=:Id", {
            Id: id
        }) as WarriorRecordResult
        return result.length === 0 ? null : new WarriorRecord(result[0])
    }

    static async getAll(): Promise<WarriorRecord[]> {
        const [result] = await pool.execute("SELECT * FROM `warriors`") as WarriorRecordResult
        return result.map(obj => new WarriorRecord(obj))
    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        const [result] = await pool.execute("SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT:topCountWinners", {
            topCountWinners: topCount
        }) as WarriorRecordResult
        return result.map(obj => new WarriorRecord(obj))
    }


    static async isNameTaken(name: string): Promise<boolean> {
        const [result] = await pool.execute("SELECT * FROM `warriors` WHERE `name` = :name",{
            name
        }) as WarriorRecordResult
        return result.length > 0
    }
}
