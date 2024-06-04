import { Router, Request, Response } from 'express'

const router = Router()

router.route("/cursos")
        .get((req:Request,res:Response)=>{
            
        })

router.route("/cursos/:id")
        .get((req:Request,res:Response)=>{

        })
        .delete((req:Request,res:Response)=>{
            
        })
        .put((req:Request,res:Response)=>{
            
        })

router.route("/cursos/:id/profesores")
        .get((req:Request,res:Response)=>{

        })
        .post((req:Request,res:Response)=>{

        })      

export default router