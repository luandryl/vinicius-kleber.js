'use strict';
import BaseController from './Base.Controller'
import User from '../models/User.Model'
/*
  Model operations to Student
*/
/*
  Because this class extends to Controller we inherit from then all the basics data Operations.
  More specifcs RESOURCES CONTROL OPERATIONS should be implemented here
*/
export default class UserController extends BaseController {
   /*
    pass the model this class will map 
    to our parent class (Basecontroller)
  */
  constructor() {
    /*
      Calling the constructor from the parent class
      and pass to him all the config that him needs to work

      so ... magic, your crud its done :3
      try with another mongooseSchema, will work,
      
      if its dont make sense map a mongooseSchema to 
      a resource controller just dont override the constructor method
      this open the possibility to bring another resources controllers(BookController, ChapterController)
      and compose one operation with them together
    */
    super(User)
  }

  /*
    Below its a exemple of specifcs RESOURCES CONTROL OPERATIONS that
    only make sense a Student have
  */

  studentByLogin(req, res) {
    
    let data = {
      login: req.params.login
    }

    let student = new StudentModel(data).getByField()

    Promise.all([
			student
		]).then((data) => {
			if(data) {
        res.send(data[0])
        res.status(200);
        res.end()
      }
		}).catch(err => {
			res.json(err);
      res.status(400);
      res.end();
		})
  }

  updateByLogin(req, res) {
    let query = {
      login: req.params.login
    }

    let student = new StudentModel(req.body).updateByField(query)

    Promise.all([
			student
		]).then((data) => { 
			if(data) {
        res.send(data[0])
        res.status(200);
        res.end()
      }
		}).catch(err => {
			res.json(err);
      res.status(400);
      res.end();
		})
  }

  removeByLogin(req, res) {
    let query = {
      login: req.params.login
    }
    
    let student = new StudentModel().deleteByField(query)

    Promise.all([
			student
		]).then((data) => {
			if(data) {
        res.send(data[0])
        res.status(200);
        res.end()
      }
		}).catch(err => {
			res.json(err);
      res.status(400);
      res.end();
		})
  }

}