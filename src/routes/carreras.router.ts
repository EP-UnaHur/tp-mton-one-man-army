import { Router, Request, Response } from 'express'
import CarrerasController from '../controllers/carreras.controller'
import handlePromise from '../utils/promise'
import MateriasController from '../controllers/materias.controller'

const router = Router()

router.route("/carreras")
        .get(async (_:Request,res:Response)=>{
                const [response, err] = await handlePromise(CarrerasController.getAll())

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })
        .post(async (req:Request,res:Response)=>{
                const {nombre,grado,universidad} = req.body

                const [response, err] = await handlePromise(CarrerasController.putSingle({nombre,grado,universidad}))  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })


router.route("/carreras/:id")
        .get(async (req:Request,res:Response)=>{

                const id = parseInt(req.params.id)

                if(isNaN(id)) return res.status(400).send("El id de carrera debe ser numerico")

                const [response, err] = await handlePromise(CarrerasController.getSingle(id))  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })


router.route("/carreras/:id/materias")
        .get(async (req:Request,res:Response)=>{
                const id = parseInt(req.params.id)
                if(isNaN(id)) return res.status(400).send("El id de carrera debe ser numerico")

                const [response, err] = await handlePromise(
                        MateriasController.getByIdCarrera(id)
                )  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })

router.route("/carreras/:id/materia")
        .post(async (req:Request,res:Response)=>{
                const id = parseInt(req.params.id)
                if(isNaN(id)) return res.status(400).send("El id de carrera debe ser numerico")

                const {nombre,cuatrimestral,anio,carreraId} = req.body

                const [response, err] = await handlePromise(
                        MateriasController.putSingle(id,{nombre,cuatrimestral,anio,carreraId})
                )  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })

export default router