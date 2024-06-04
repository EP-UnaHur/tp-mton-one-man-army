import handlePromise from "../utils/promise"
import * as db from '../db/models'
import ApiResponse from "../types/api-response"
import Curso from "../types/curso"
const { Materia,Cursos,Profesores} = db

type CursoArrayResponse = ApiResponse<Curso[]>
type CursoResponse = ApiResponse<Curso>

export default class CursosController{
    static async getByIdMateria(idMateria:number):Promise<CursoArrayResponse>{

      const [materia,errMateria] = await handlePromise(Materia.findByPk(idMateria))

      if(errMateria) return Promise.reject({status:500, error:errMateria})

      if(!materia) return Promise.reject({status:404, error:"No se encontró la materia solicitada"})
      
      const [cursos,err] = await handlePromise(
        Materia.findByPk(idMateria, {
          include: [{ model: Cursos, as: "cursos" }],
        })
      )

      if(err) return Promise.reject({status:500, error:err})

      return {status:200, body: cursos}
    }

    static async getByIdProfesor(idProfesor:number):Promise<CursoArrayResponse>{

      const [profesor,errProfesor] = await handlePromise(Profesores.findByPk(idProfesor))

      if(errProfesor) return Promise.reject({status:500, error:errProfesor})

      if(!profesor) return Promise.reject({status:404, error:"No se encontró el profesor solicitado"})
      
      const [cursos,err] = await handlePromise(
        Profesores.findByPk(idProfesor, {
          include: [{ model: Cursos, as: "cursos" }],
        })
      )

      if(err) return Promise.reject({status:500, error:err})

      return {status:200, body: cursos}
    }

    static async putSingle(idMateria:number,curso:Curso):Promise<CursoResponse>{
      const [materia,errMateria] = await handlePromise(Materia.findByPk(idMateria))

      if(errMateria) return Promise.reject({status:500, error:errMateria})

      if(!materia) return Promise.reject({status:404, error:"No se encontró la materia solicitada"})

      const [response,err] = await handlePromise(Cursos.create({carrera_id:idMateria,...curso}))

      if(err) return Promise.reject({status:500, error:err})

      return {status:201, body: response}
  }

    static async getAll():Promise<CursoArrayResponse>{
      const [cursos,err] = await handlePromise(Cursos.findAll({}))

      if(err) return Promise.reject({status:500, error:err})

      return {status:200, body: cursos}
  }

    static async getSingle(id:number):Promise<CursoResponse>{
        const [curso,err] = await handlePromise(Cursos.findByPk(id))

        if(err) return Promise.reject({status:500, error:err})

        if(!curso) return Promise.reject({status:404, error:"No se encontró el curso solicitado"})

        return {status:200, body: curso}
    } 

    static async deleteById(id:number):Promise<CursoResponse>{
      const [curso,err] = await handlePromise(Cursos.findByPk(id))

      if(err) return Promise.reject({status:500, error:err})

      if(!curso) return Promise.reject({status:404, error:"No se encontró el curso solicitado"})

      const [response,errDelete] = await handlePromise(Cursos.destroy({ where: { id } }))

      if(err) return Promise.reject({status:500, error:errDelete})

      return {status:200, body: response}
    }

    static async updateById(id:number,curso:Curso):Promise<CursoResponse>{
      const [_curso,err] = await handlePromise(Cursos.findByPk(id))

      if(err) return Promise.reject({status:500, error:err})

      if(!_curso) return Promise.reject({status:404, error:"No se encontró el curso solicitado"})

      _curso.comision = curso.comision;
      _curso.turno = curso.turno;
      _curso.fechaInicio = curso.fechaInicio;
      _curso.fechaFin = curso.fechaFin;
  
      const [response,errUpdate] = await handlePromise(_curso.save())

      if(err) return Promise.reject({status:500, error:errUpdate})

      return {status:200, body: response}
    }

    static async addProfesoresToCurso(idCurso:number,idsProfesores:number[]):Promise<CursoResponse>{
      const [curso,err] = await handlePromise(Cursos.findByPk(idCurso))

      if(err) return Promise.reject({status:500, error:err})

      if(!curso) return Promise.reject({status:404, error:"No se encontró el curso solicitado"})

      const [profesores,profesoresErr] = await handlePromise(
        Profesores.findAll({
          where: { id: idsProfesores },
        })
      )

      if(err) return Promise.reject({status:500, error:profesoresErr})

      if(profesores.length !== idsProfesores.length) return Promise.reject({status:404, error:"No se encontró alguno de los profesores solicitados"})

      const [response,errUpdate] = await handlePromise(curso.addProfesores(profesores))

      if(err) return Promise.reject({status:500, error:errUpdate})

      return {status:200, body: response}
    }


}