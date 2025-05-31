const express=require('express')
const router=express.Router()
const {CreateForm, UpdateForm, GetFormData}=require('../controllers/CreateForm')
const {printRoute}=require("../controllers/printRoute")
const { CreateSteps, updateStep } = require('../controllers/CreateSteps')
const {FileUpload }= require('../controllers/fileUpload');
const { SubmitResponse } = require('../controllers/SubmitResponse')
const { fetchResponse } = require('../controllers/fetchResponse')

router.post("/createform",CreateForm)
router.put("/updateform",UpdateForm)
router.post("/getformData",GetFormData)
router.put("/updateStep",updateStep)
router.post("/createStep",CreateSteps)
router.get("/print",printRoute)
router.post("/fileUpload",FileUpload);
router.get("/fetchresponse",fetchResponse)

router.post("/submitResponse",SubmitResponse)

module.exports = router;