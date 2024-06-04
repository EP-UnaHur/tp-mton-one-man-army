import { Router, Request, Response } from 'express'
import handlePromise from '../utils/promise'
import ProfesoresController from '../controllers/profesores.controller'
import CursosController from '../controllers/cursos.controller'

const router = Router()

router.route("/profesores")
        .get(async(_:Request,res:Response)=>{
                const [response, err] = await handlePromise(ProfesoresController.getAll())

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })
        .post(async(req:Request,res:Response)=>{
                const {nombre,fechaNacimiento,legajo,activo} = req.body

                const [response, err] = await handlePromise(ProfesoresController.putSingle({nombre,fechaNacimiento,legajo,activo}))  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })    

router.route("/profesores/:id")
        .get(async (req:Request,res:Response)=>{

                const id = parseInt(req.params.id)

                if(isNaN(id)) return res.status(400).send("El id de profesor debe ser numerico")

                const [response, err] = await handlePromise(ProfesoresController.getSingle(id))  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })
        .delete(async(req:Request,res:Response)=>{
        const id = parseInt(req.params.id)

        if(isNaN(id)) return res.status(400).send("El id de profesor debe ser numerico")

        const [response, err] = await handlePromise(ProfesoresController.deleteById(id))  

        if(err) {
                console.error(err)
                return res.status(err.status).send(err.error)
        }

        res.sendStatus(response.status)
        })
        .put(async(req:Request,res:Response)=>{
                const id = parseInt(req.params.id)
                if(isNaN(id)) return res.status(400).send("El id de profesor debe ser numerico")

                const {nombre,fechaNacimiento,legajo,activo} = req.body

                const [response, err] = await handlePromise(
                        ProfesoresController.updateById(id,{nombre,fechaNacimiento,legajo,activo})
                )  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })

router.route("/profesores/:id/cursos")
        .get(async(req:Request,res:Response)=>{
                const id = parseInt(req.params.id)

                if(isNaN(id)) return res.status(400).send("El id de profesor debe ser numerico")

                const [response, err] = await handlePromise(CursosController.getByIdProfesor(id))  

                if(err) {
                        console.error(err)
                        return res.status(err.status).send(err.error)
                }

                res.status(response.status).send(response.body)
        })
     

export default router