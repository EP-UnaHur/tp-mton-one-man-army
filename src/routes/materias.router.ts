import { Router, Request, Response } from 'express'
import MateriasController from '../controllers/materias.controller'
import handlePromise from '../utils/promise'
import CursosController from '../controllers/cursos.controller'

const router = Router()

router.route("/materias")
        .get(async (_:Request,res:Response)=>{
                const [response, err] = await handlePromise(MateriasController.getAll())

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })

router.route("/materias/:id")
                .get(async (req:Request,res:Response)=>{

                        const id = parseInt(req.params.id)

                        if(isNaN(id)) return res.status(400).send("El id de materia debe ser numerico")

                        const [response, err] = await handlePromise(MateriasController.getSingle(id))  

                        if(err) {
                                console.error(err)
                                return res.status(err.status).send(err.error)
                        }

                        res.status(response.status).send(response.body)
                })
        .delete(async(req:Request,res:Response)=>{
                const id = parseInt(req.params.id)

                if(isNaN(id)) return res.status(400).send("El id de materia debe ser numerico")

                const [response, err] = await handlePromise(MateriasController.deleteById(id))  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.sendStatus(response.status)
        })

router.route("/materias/:id/curso")
        .get(async (req:Request,res:Response)=>{
                const id = parseInt(req.params.id)
                if(isNaN(id)) return res.status(400).send("El id de materia debe ser numerico")

                const [response, err] = await handlePromise(
                        CursosController.getByIdMateria(id)
                )  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })

router.route("/materias/:id/curso")
        .post(async(req:Request,res:Response)=>{
                const id = parseInt(req.params.id)
                if(isNaN(id)) return res.status(400).send("El id de materia debe ser numerico")

                const {comision,turno,fechaInicio,fechaFin} = req.body

                const [response, err] = await handlePromise(
                        CursosController.putSingle(id,{comision,turno,fechaInicio,fechaFin})
                )  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })

export default router