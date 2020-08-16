// servidor
const express = require('express')
const server = express()

const {pageLanding, pageStudy, pageGiveClasses} = require('./pages')

// cconfigurar nunjuccks (template engine)
const nunjucks = require('nunjucks')
const pages = require('./pages')
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
// start no servidor
.listen(5500)
