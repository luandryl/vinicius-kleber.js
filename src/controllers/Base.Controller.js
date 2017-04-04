'use strict';
/*
  Base Controller Operations
*/
export default class BaseController {
  /*
    The Constructor recives
    @model => mongoose Schema {
      sharing model context with the parent class
    }
  */
  constructor (model) {
    this.model = model
  }

  /*
    recives
    @req => express.Router() req context
    @req => express.Router() res context
  */
  /*
    Basics crud -> ID bases
  */

  /*
    All the methods working in the same way -> 
      resolve a promise given by mongoDB call
  */
  /*
    eg: save()
      req -> express.Router() context
      res -> express.Router() context

      so we resolve a promise call to any model (the model this is given by our child class)
      and before resolve we send the response to the client
  */
  save (req, res) {

    let modelPromise = new this.model(req.body).persist()
    
    Promise.all([
			modelPromise
		]).then((data) => {
			if(data) {
        res.send(data[0])
        res.status(201);
        res.end()
      }
		}).catch(err => {
			res.json(err);
      res.status(400);
      res.end();
		})
  }

  getById (req, res) {
    let modelPromise = new 
		this.model({
			_id: req.params.id
		}).getById();
		
		Promise.all([
			modelPromise
		]).then((data) => {
			if(data) {
        res.send(data[0])
        res.status(200);
        res.end()
      }
		}).catch(err => {
			console.log(err)
		})
  }

  updateById (req, res) {
		
    let modelPromise = this.model(req.body).updateById()

		Promise.all([
			modelPromise
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

  removeById (req, res) {

    let data = {
			_id: req.params.id
  	}	
		
    let modelPromise = this.model(data).deleteById()

		Promise.all([
			modelPromise
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