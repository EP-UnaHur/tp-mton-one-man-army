import CarrerasRouter from './carreras.router'
import CursosRouter from './cursos.router'
import MateriasRouter from './materias.router'
import ProfesoresRouter from './profesores.router'

import { Router } from 'express'

const router = Router()

router.use(CarrerasRouter)
router.use(CursosRouter)
router.use(MateriasRouter)
router.use(ProfesoresRouter)
 
export default router