const httpServer = require('./app')




const port = process.env.PORT || 8080;

httpServer.listen(8080 , ()=>{
    console.log(`Listening : http://localhost:${8080}`)
})