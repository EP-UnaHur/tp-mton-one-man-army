import { Router, Request, Response } from 'express'
import CarrerasController from '../controllers/carreras.controller'
import handlePromise from '../utils/promise'

const router = Router()

router.route("/carreras")
        .get(async (_:Request,res:Response)=>{
                const [response, err] = await handlePromise(CarrerasController.getAll())

                if(err) {
                        console.error(err)
                        return res.status(500).send(err)
                }

                res.status(response.status).send(response.body)
        })
        .post(async (req:Request,res:Response)=>{
                const {nombre,grado,universidad} = req.body

                const [response, err] = await handlePromise(CarrerasController.putSingle({nombre,grado,universidad}))  

                if(err) {
                        console.error(err)
                        return res.status(500).send(err)
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
                        return res.status(500).send(err)
                }

                res.status(response.status).send(response.body)
        })


router.route("/carreras/:id/materias")
        .get((req:Request,res:Response)=>{

        })

router.route("/carreras/:id/materia")
        .post((req:Request,res:Response)=>{

        })

export default router