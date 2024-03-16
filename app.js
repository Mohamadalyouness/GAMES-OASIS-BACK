import express from 'express'
import dotenv from 'dotenv'
import connect from './Config/db.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import cors from 'cors'
import { Server } from 'socket.io'
import {createServer} from 'http'
import auth from "./Routes/authRoutes.js"
import Community from "./Routes/CommunityRoutes.js"
import ChatMessage from './Routes/ChatRoutes.js';
import News from './Routes/NewsRoutes.js'
import Tournament from './Routes/TournamentRoutes.js';
dotenv.config()
const app = express()
//middlware to parse request body that doesn't contains files(multer will do parse the one contains files)
app.use(bodyParser.urlencoded({extended:false}))
//middleware to parse json objects
app.use(express.json())
//define images folder as static folder
app.use("/assets", express.static('assets'));
//Allow access from any origin
const allowedOrigins = [
    'https://games-oasis-front-9o9ljg7ul-mohamadalyouness-projects.vercel.app',
    'http://localhost:5173'
  ];
  
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

app.use(cookieParser())

app.use((req,res,next) => {
    console.log(`//${req.method} ${req.path} `);
    next()
})
//Routes 
app.use('/api/', auth);
app.use('/api/community', Community);
app.use('/api/chatmessage', ChatMessage);
app.use('/api/News', News);
app.use('/api/tournament', Tournament);


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
