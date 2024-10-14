const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
require("dotenv").config();
const http = require("http");
const cookieParser=require("cookie-parser")
app.use(cookieParser())
const port = process.env.PORT
const UserRoute=require("./routes/user.route")
const TaskRoute=require("./routes/task.route")
const cors=require("cors")
const path=require("path")
app.use(cors())
app.use(express.static(path.resolve( './public')));
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require("./config/db")
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: ' Team_Collaboration_Management  API',
        version: '1.0.0',
        description: 'API for managing Team_Collaboration_Management',
    },
    servers: [
        {
            url: 'http://localhost:3000/api', // Replace with your API base URL
        },
    ],
};
// Options for Swagger JSDoc
const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/user.route.js', './routes/task.route.js'], // Path where API routes are defined
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/v1/auth",UserRoute)
  app.use("/api/v1/task",TaskRoute)
  app.get("/", (req, res) => {
    return res.sendFile("/public/index.html");
    res.send("")
  });

  
server.listen(port, () => console.log(`Example app listening on port ${port}!`))