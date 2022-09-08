//require
const { readFileSync, writeFileSync } = require('fs')
const path = require('path')


//showAllDevs
const showAllDevs = (req, res) =>{
    //devs data
    const devs = JSON.parse(readFileSync((path.join(__dirname, '../db/devs.json'))))

    res.render('devs/index',{
        devs
    })
}

//createDevs
const createDevs = (req, res) =>{
    res.render('devs/create')
}

//storeNewDevs
const storeNewDevs = (req, res) =>{
    //devs data
    const devs = JSON.parse(readFileSync((path.join(__dirname, '../db/devs.json'))))
    //get all data
    const { name, phone, email, location} = req.body

    //get last data
    let lastData = 1;
    if ( devs.length > 0) {
        lastData = devs[devs.length -1].id +1
    }

    //add a new data
    devs.push({
        id : lastData,
        name : name,
        phone : phone,
        email : email,
        location : location,
        photo : req.file ? req.file.filename : 'avatar.png'
    })

    //now write the new data to json db
   writeFileSync(path.join(__dirname, '../db/devs.json'), JSON.stringify(devs))

   //now redirect to index page
   res.redirect('/devs')
    


}

//editStudent
const editStudent = (req, res) =>{
    const devs = JSON.parse(readFileSync((path.join(__dirname, '../db/devs.json'))))
    const {id} = req.params;
    const dev = devs.find( data => data.id == id)

    res.render('devs/edit', { dev })
}

//singleStudent
const singleStudent = (req, res) =>{
    const devs = JSON.parse(readFileSync((path.join(__dirname, '../db/devs.json'))))
    const {id} = req.params;
    const dev = devs.find( data => data.id == id)
    res.render('devs/show', { dev })
}


// delete student
const deleteStudent = (req, res) =>{
    const devs = JSON.parse(readFileSync((path.join(__dirname, '../db/devs.json'))))
    const {id} = req.params;
    const remDev = devs.filter( data => data.id != id)
    
    //now write the remaining data to json db
   writeFileSync(path.join(__dirname, '../db/devs.json'), JSON.stringify(remDev))

      //now redirect to index page
      res.redirect('/devs')
}

// update dev
const updataedev = (req, res) =>{
    const {name, phone, email, location, photo } = req.body;
    const devs = JSON.parse(readFileSync((path.join(__dirname, '../db/devs.json'))))
    const {id} = req.params;
    devs[devs.findIndex( data => data.id == id)] = {
        ... devs[devs.findIndex( data => data.id == id)],
        name,
        phone,
        email,
        location
    }

    //now write the remaining data to json db
   writeFileSync(path.join(__dirname, '../db/devs.json'), JSON.stringify(devs))

    res.redirect('back')

}

//exports
module.exports = {
    showAllDevs,
    createDevs,
    storeNewDevs,
    editStudent,
    singleStudent,
    deleteStudent,
    updataedev
}