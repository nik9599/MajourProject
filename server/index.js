const app = require('./app')

const port = process.env.PORT || 8080;

app.listen(8080 , ()=>{
    console.log(`Listening : http://localhost:${8080}`)
})