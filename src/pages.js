const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes} = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})
    }

   // converter horas em minutos
   const timeToMinutes = convertHoursToMinutes(filters.time)
   
   const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT classes_schedule.*
            FROM classes_schedule
            WHERE classes_schedule.class_id = classes.id
            AND classes_schedule.weekday = ${filters.weekday}
            AND classes_schedule.time_from <= ${timeToMinutes}
            AND classes_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'    
    `
    // caso haja erro na hora da consulta do banco de dados

    try{
        const db = await Database
        const proffys = await db.all(query)
        return res.render('study.html', {proffys, subjects, filters, weekdays})

    }catch(error){
        console.log(error)
    }

}
function pageGiveClasses(req, res) {

    return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classesValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValue = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValue })

        return res.redirect("/study")
    } catch (error) {
        console.log(error)
    }
    
    
}

module.exports = {
    pageLanding, pageStudy, pageGiveClasses, saveClasses
}
