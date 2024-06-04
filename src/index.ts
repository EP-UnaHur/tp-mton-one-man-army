require('dotenv').config()

import * as express from "express"
import * as bodyParser from 'body-parser'
import * as db from './db/models'
import ApiRoutes from './routes'


const PORT = process.env.API_PORT ?? 5000

const app = express()

app.use(bodyParser.json())
app.use(ApiRoutes)

app.listen(PORT,async ()=>{
 

    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ force: true });

        console.log(`App listening on http://localhost:${PORT}/`)
      } catch (error) {
        console.log(error);
      }
})