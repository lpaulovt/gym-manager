const fs = require('fs')
const data = require('./data.json')
const {age, date} = require('./utils')
const Intl = require('Intl')

//show
exports.show = function(req, res ){
    const {id} = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

const instructor = {
    ... foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
}
    return res.render("instructors/show", {instructor})
}

//create
exports.post =  function(req, res){
    const keys = Object.keys(req.body)

    for( key of keys){
        if(req.body[key] == ""){
            res.send("Por favor, preencha todos os campos!")
        }
    }

    let {
        avatar_url,
        birth,
        name,
        gender,
        services
    } = req.body

    birth = Date.parse(birth)
    const id= Number(data.instructors.length + 1)
    const created_at = Date.now()

    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/instructors")
    })
}


//Edit

exports.edit = function(req, res){
    const {id} = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }
    return res.render('instructors/edit', {instructor})
}