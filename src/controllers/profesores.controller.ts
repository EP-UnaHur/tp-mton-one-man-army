import handlePromise from "../utils/promise"
import * as db from '../db/models'
import ApiResponse from "../types/api-response"
import Profesor from "../types/profesor"
const { Profesores, Cursos } = db

type ProfesorArrayResponse = ApiResponse<Profesor[]>
type ProfesorResponse = ApiResponse<Profesor>

export default class ProfesoresController{
    static async getAll():Promise<ProfesorArrayResponse>{
      const [profesores,err] = await handlePromise(Profesores.findAll({}))

      if(err) return Promise.reject({status:500, error:err})

      return {status:200, body: profesores}
    }

    static async getByIdCurso(idCurso:number):Promise<ProfesorArrayResponse>{

      const [curso,errCurso] = await handlePromise(Cursos.findByPk(idCurso))

      if(errCurso) return Promise.reject({status:500, error:errCurso})

      if(!curso) return Promise.reject({status:404, error:"No se encontró el curso solicitada"})
      
      const [profesores,err] = await handlePromise(
        Cursos.findByPk(idCurso, {
          include: [{ model: Cursos, as: "cursos" }],
        })
      )

      if(err) return Promise.reject({status:500, error:err})

      return {status:200, body: profesores}
    }

    static async getSingle(id:number):Promise<ProfesorResponse>{
        const [profesor,err] = await handlePromise(Profesores.findByPk(id))

        if(err) return Promise.reject({status:500, error:err})

        if(!profesor) return Promise.reject({status:404, error:"No se encontró el profesor solicitado"})

        return {status:200, body: profesor}
    } 

    static async putSingle(profesor:Profesor):Promise<ProfesorResponse>{
      const [response,err] = await handlePromise(Profesores.create(profesor))

      if(err) return Promise.reject({status:500, error:err})

      return {status:201, body: response}
  }

    static async deleteById(id:number):Promise<ProfesorResponse>{
      const [profesor,err] = await handlePromise(Profesores.findByPk(id))

      if(err) return Promise.reject({status:500, error:err})

      if(!profesor) return Promise.reject({status:404, error:"No se encontró el profesor solicitado"})

      const [response,errDelete] = await handlePromise(Profesores.destroy({ where: { id } }))

      if(err) return Promise.reject({status:500, error:errDelete})

      return {status:200, body: response}
    }

    static async updateById(id:number,profesor:Profesor):Promise<ProfesorResponse>{
      const [_profesor,err] = await handlePromise(Profesores.findByPk(id))

      if(err) return Promise.reject({status:500, error:err})

      if(!_profesor) return Promise.reject({status:404, error:"No se encontró el curso solicitado"})
      
      _profesor.nombre = profesor.nombre;
      _profesor.fechaNacimiento = profesor.fechaNacimiento;
      _profesor.legajo = profesor.legajo;
      _profesor.activo = profesor.activo;
  
      const [response,errUpdate] = await handlePromise(_profesor.save())

      if(err) return Promise.reject({status:500, error:errUpdate})

      return {status:200, body: response}
    }
}