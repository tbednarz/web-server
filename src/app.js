const express = require('express')
const path = require('path')

const publicDir =(path.join(__dirname, '../public'))
const app = express()

app.use(express.static(publicDir))


// app.get("/help", (req, res) => {
//     res.send([{
//         name: "Tres"
//     },
//     {
//        age: 25
//     }])
// })

// app.get("/about", (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.get("/weather", (req,res) => {
//     res.send([{
//         weather: 59,
//         location: "Marquette"
//     }])
// })
app.listen(3000, () => {
    console.log('Server is listening')
})
