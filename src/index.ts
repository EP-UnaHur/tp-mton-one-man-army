import * as express from 'express'
import * as bodyParser from 'body-parser'
import ApiRoutes from './routes'

const PORT = process.env.API_PORT ?? 5000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(ApiRoutes)

app.listen(PORT,()=>{
    console.log(`App listening on http://localhost:${PORT}/`)
})