const proffys = {
  name : "Diego Fernandes",
  avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
  whatsapp : "85843823485", 
  bio : "este é só um teste", 
  subject: "Química",
  cost: "20", 
  weekday : [0], 
  time_from : [720], 
  time_to: [1220]
}
const title = "Hi friend"

function pageLanding(req, res) {
  return res.render("index.html") 
}
function pageStudy(req, res) {
  return res.render("study.html", {proffys, title})
}
function pageGiveClasses(req, res) {
    return res.render("give-classes.html")
}

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

// configurar nunjucks
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})

server

// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))

// rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)
