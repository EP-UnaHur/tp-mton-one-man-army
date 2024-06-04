import handlePromise from "../utils/promise"
import * as db from '../db/models'
import ApiResponse from "../types/api-response"
import MateriaType from "../types/materia"
const { Materia: MateriaType,Carreras} = db

type MateriaArrayResponse = ApiResponse<MateriaType[]>
type MateriaResponse = ApiResponse<MateriaType>

export default class MateriasController{
    static async getByIdCarrera(idCarrera):Promise<MateriaArrayResponse>{

      const [carrera,errCarrera] = await handlePromise(Carreras.findByPk(idCarrera))

      if(errCarrera) return Promise.reject({status:500, error:errCarrera})

      if(!carrera) return Promise.reject({status:404, error:"No se encontró la carrera solicitada"})
      
      const [materias,err] = await handlePromise(
        Carreras.findByPk(idCarrera, {
          include: [{ model: MateriaType, as: "materias" }],
        })
      )

      if(err) return Promise.reject({status:500, error:err})

      return {status:200, body: materias}
    }

    static async getAll():Promise<MateriaArrayResponse>{
      const [materias,err] = await handlePromise(MateriaType.findAll({}))

      if(err) return Promise.reject({status:500, error:err})

      return {status:200, body: materias}
  }

    static async getSingle(id:number):Promise<MateriaResponse>{
        const [materia,err] = await handlePromise(MateriaType.findByPk(id))

        if(err) return Promise.reject({status:500, error:err})

        if(!materia) return Promise.reject({status:404, error:"No se encontró la materia solicitada"})

        return {status:200, body: materia}
    } 

    static async putSingle(idCarrera:number,materia:MateriaType):Promise<MateriaResponse>{
        const [carrera,errCarrera] = await handlePromise(Carreras.findByPk(idCarrera))

        if(errCarrera) return Promise.reject({status:500, error:errCarrera})

        if(!carrera) return Promise.reject({status:404, error:"No se encontró la carrera solicitada"})

        const [response,err] = await handlePromise(MateriaType.create({carrera_id:idCarrera,...materia}))

        if(err) return Promise.reject({status:500, error:err})

        return {status:201, body: response}
    }

    static async deleteById(id:number):Promise<MateriaResponse>{
      const [materia,err] = await handlePromise(MateriaType.findByPk(id))

      if(err) return Promise.reject({status:500, error:err})

      if(!materia) return Promise.reject({status:404, error:"No se encontró la materia solicitada"})

      const [response,errDelete] = await handlePromise(await MateriaType.destroy({ where: { id } }))

      if(err) return Promise.reject({status:500, error:errDelete})

      return {status:200, body: response}
  }
}