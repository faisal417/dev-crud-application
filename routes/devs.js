//require
const express = require('express')
const { showAllDevs, createDevs, storeNewDevs, editStudent, singleStudent, deleteStudent, updataedev, showAllUnverifiedDevs, verifyAccount} = require('../controllers/devsControllers')
const multer = require('multer')
const path = require('path')


//init router
const router = express.Router()

//multer configaration
const storage = multer.diskStorage({
    destination : ( req, file, cb ) =>{

        cb(null, path.join(__dirname, '../public/images/devs'))
    },
    filename : ( req, file, cb ) =>{

        cb(null, file.originalname)
    }
});

//middleware
const devsImageMulter = multer({
    storage: storage
}).single('devs-image');

//roting
router.get('/', showAllDevs)
router.get('/unverified', showAllUnverifiedDevs)
router.get('/verify/:token', verifyAccount)
router.get('/create', createDevs)
router.post('/create', devsImageMulter, storeNewDevs)

router.get('/delete/:id', deleteStudent)

router.get('/edit/:id', editStudent)
router.post('/update/:id', devsImageMulter, updataedev)


router.get('/:id', singleStudent)

//export
module.exports =router;