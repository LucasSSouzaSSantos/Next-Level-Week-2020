const Database = require('./database/db')

const { subjects, weekdays, getSubject } = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})
    }

   // converter horas em minutos
   
   
   const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT classes_schedule.*
            FROM classes_schedule
            WHERE classes_schedule.class_id = classes.id
            AND classes_schedule.weekday = ${filters.weekday}
            AND classes_schedule.time_from <= ${filters.time}
            AND classes_schedule.time_to > "${filters.time}
        )    
    `

    // return res.render("study.html", { proffys, filters, subjects, weekdays })
}
function pageGiveClasses(req, res) {
    const data = req.query


    // se tiver dados(data)
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {
        
        data.subject = getSubject(data.subject)
        
        //adicionar data a lista de proffys
        proffys.push(data)
    
        return res.redirect("/study")
    }

    // se não, mostrar a página
    return res.render("give-classes.html", { subjects, weekdays })
}

module.exports = {
    pageLanding, pageStudy, pageGiveClasses
}
