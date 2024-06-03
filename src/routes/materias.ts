import { Router, Request, Response } from 'express'

const router = Router()

router.route("/materias")
        .get((req:Request,res:Response)=>{
            
        })

router.route("/materias/:id")
        .get((req:Request,res:Response)=>{

        })
        .delete((req:Request,res:Response)=>{
            
        })

router.route("/materias/:id/curso")
        .get((req:Request,res:Response)=>{

        })

router.route("/materias/:id/curso")
        .post((req:Request,res:Response)=>{

        })

export default router