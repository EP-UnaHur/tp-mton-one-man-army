import CarrerasRouter from './carreras'
import CursosRouter from './cursos'
import MateriasRouter from './materias'
import ProfesoresRouter from './profesores'

import { Router } from 'express'

const router = Router()

router.use(CarrerasRouter)
router.use(CursosRouter)
router.use(MateriasRouter)
router.use(ProfesoresRouter)
 
export default router