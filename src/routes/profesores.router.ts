import { Router, Request, Response } from 'express'

const router = Router()

router.route("/profesores")
        .get((req:Request,res:Response)=>{
            
        })
        .post((req:Request,res:Response)=>{

        })    

router.route("/profesores/:id")
        .get((req:Request,res:Response)=>{

        })
        .delete((req:Request,res:Response)=>{
            
        })
        .put((req:Request,res:Response)=>{
            
        })

router.route("/profesores/:id/cursos")
        .get((req:Request,res:Response)=>{

        })
     

export default router