import express from 'express'
import dotenv from 'dotenv'
import connect from './Config/db.js'
import cors from 'cors'
import { Server } from 'socket.io'
import {createServer} from 'http'
dotenv.config()
const app = express()
//middlware to parse request body that doesn't contains files(multer will do parse the one contains files)
// app.use(bodyParser.urlencoded({extended:false}))
//middleware to parse json objects
app.use(express.json())
//define images folder as static folder
// app.use('/images',express.static('images'))
//Allow access from any origin
app.use(cors())

// app.use(cookieParser())

app.use((req,res,next) => {
    console.log(`//${req.method} ${req.path} `);
    next()
})


//this middleware coonect to the mongodb atlas cluster, 'db_string' is the connection string
await connect(process.env.CONNECTION_STRING)
const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:'*',
        methods:['GET','POST','PUT','PATCH','DELETE']
    }
})
io.on("connection",(socket) =>{

        console.log(socket.id);

})
httpServer.listen(process.env.PORT,(err) => {
    if(err){
        console.log('Something went wrong',err);
    }
    else{
        console.log(`Server starting on port ${process.env.PORT}`);
    }
    
})