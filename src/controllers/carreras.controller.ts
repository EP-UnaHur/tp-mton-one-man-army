import handlePromise from "../utils/promise"
import * as db from '../db/models'
import Carrera from "../types/carrera"
import ApiResponse from "../types/api-response"
const {Carreras} = db

type CarreraArrayResponse = ApiResponse<Carrera[]>
type CarreraResponse = ApiResponse<Carrera>

export default class CarrerasController{
    static async getAll():Promise<CarreraArrayResponse>{
        const [carreras,err] = await handlePromise(Carreras.findAll({}))

        if(err) return Promise.reject({status:500, error:err})

        return {status:200, body: carreras}
    }

    static async getSingle(id:number):Promise<CarreraResponse>{
        const [carrera,err] = await handlePromise(Carreras.findByPk(id))

        if(err) return Promise.reject({status:500, error:err})

        if(!carrera) return Promise.reject({status:404, error:"No se encontró la carrera solicitada"})

        return {status:200, body: carrera}
    } 

    static async putSingle(carrera:Carrera):Promise<CarreraResponse>{
        const [response,err] = await handlePromise(Carreras.create(carrera))

        if(err) return Promise.reject({status:500, error:err})

        return {status:201, body: response}
    }
}