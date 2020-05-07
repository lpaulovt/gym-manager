const fs = require('fs')
const data = require('./data.json')

exports.post =  function(req, res){
    const keys = Object.keys(req.body)

    for( key of keys){
        if(req.body[key] == ""){
            res.send("Por favor, preencha todos os campos!")
        }
    }
    
    data.instructors.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/instructors")
    })
}