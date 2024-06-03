import { Router, Request, Response } from 'express'

const router = Router()

router.route("/carreras")
        .get((req:Request,res:Response)=>{
            
        })
        .post((req:Request,res:Response)=>{
            
        })


router.route("/carreras/:id")
        .get((req:Request,res:Response)=>{

        })


router.route("/carreras/:id/materias")
        .get((req:Request,res:Response)=>{

        })

router.route("/carreras/:id/materia")
        .post((req:Request,res:Response)=>{

        })

export default router