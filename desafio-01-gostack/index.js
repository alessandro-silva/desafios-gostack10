const express = require('express')

const server = express()

server.use(express.json())

const projects = []


server.use((req, res, next) => {
     console.log(`Método: ${req.method} URL: ${req.url}`)

     return next()
})

function checkProjectExists(req, res, next) {
     if (!req.body.title) {
          return res.status(400).json({ error: 'title is required' })
     }

     return next()
}

function checkProjectInArray(req, res, next) {
     if (!projects[req.params.id]) {
          return res.status(400).json({ error: 'Project does not exists' })
     }

     return next()
}

server.get('/projects', (req, res) => {
     return res.json(projects)
})

server.post('/projects', checkProjectExists, (req, res) => {
     const { id, title } = req.body

     const project = {
          id,
          title,
          talks: []
     }

     projects.push(project)

     return res.json(projects)
})

server.put('/projects/:id', checkProjectExists, checkProjectInArray, (req, res) => {
     const { id } = req.params
     const { title } = req.body

     const project = projects.find(i => i.id == id)
     project.title = title

     return res.json(projects)
})

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
     const { id } = req.params

     const project = projects.findIndex(i => i.id == id)
     projects.splice(project, 1)

     return res.json(projects)
})

server.post('/projects/:id/talks', checkProjectExists, checkProjectInArray, (req, res) => {
     const { id } = req.params
     const { title } = req.body

     const project = projects.find(i => i.id == id)
     project.talks.push(title)

     return res.json(projects)
})

server.listen(3000)
