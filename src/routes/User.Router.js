import express from 'express'
/*
  Import the resource controller, the code below its pretty intuitive :3
*/
import UserController from '../controllers/User.Controller'

let router = express.Router()
/*
  import student RESOURCE CONTROLLER 
*/
let us = new UserController()


/*
  routing the controller object through student resource endpoints
*/
router.post('/', (req, res) => {
  us.save(req, res)
})

router.get('/:id', (req, res) => {
  us.getById(req, res)
})
 
router.put('/:id', (req, res) => {
  us.updateById(req, res)
})

router.delete('/:id', (req, res) => {
  us.removeById(req, res)
})

export default router