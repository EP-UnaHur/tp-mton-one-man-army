import { Router, Request, Response } from 'express'
import CursosController from '../controllers/cursos.controller'
import handlePromise from '../utils/promise'
import ProfesoresController from '../controllers/profesores.controller'

const router = Router()

router.route("/cursos")
        .get(async (_:Request,res:Response)=>{
                const [response, err] = await handlePromise(CursosController.getAll())

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })

router.route("/cursos/:id")
        .get(async (req:Request,res:Response)=>{
                const id = parseInt(req.params.id)

                if(isNaN(id)) return res.status(400).send("El id de curso debe ser numerico")

                const [response, err] = await handlePromise(CursosController.getSingle(id))  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })
        .delete(async(req:Request,res:Response)=>{
        const id = parseInt(req.params.id)

        if(isNaN(id)) return res.status(400).send("El id de curso debe ser numerico")

        const [response, err] = await handlePromise(CursosController.deleteById(id))  

        if(err) {
                console.error(err)
                return res.status(err.status).send(err.error)
        }

        res.sendStatus(response.status)
        })
        .put(async(req:Request,res:Response)=>{
                const id = parseInt(req.params.id)
                if(isNaN(id)) return res.status(400).send("El id de curso debe ser numerico")

                const {comision,turno,fechaInicio,fechaFin} = req.body

                const [response, err] = await handlePromise(
                        CursosController.updateById(id,{comision,turno,fechaInicio,fechaFin})
                )  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })

router.route("/cursos/:id/profesores")
        .get(async(req:Request,res:Response)=>{
                const id = parseInt(req.params.id)

                if(isNaN(id)) return res.status(400).send("El id de curso debe ser numerico")

                const [response, err] = await handlePromise(ProfesoresController.getByIdCurso(id))  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })
        .post(async(req:Request,res:Response)=>{
                const id = parseInt(req.params.id)

                if(isNaN(id)) return res.status(400).send("El id de curso debe ser numerico")

                const {idsProfesores} = req.body

                let ids:number[] = []

                for( let id in idsProfesores){
                        const _id = parseInt(idsProfesores[id])

                        if(isNaN(_id))
                                 return res.status(400).send("Los ids de profesor deben ser numericos")

                        ids.push(_id)
                }


                const [response, err] = await handlePromise(CursosController.addProfesoresToCurso(id,ids))  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })      

export default router