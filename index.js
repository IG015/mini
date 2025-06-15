const path = require('path')
const express = require('express')
const app = express()
const port = 3000

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"view","index.html"))
})
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname,"view","sobre.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/', (req, res) => {
    res.send('Got a POST request')
  })

  app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
  })
  
  app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
  })
      