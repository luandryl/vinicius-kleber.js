'use strict';
import mongoose from 'mongoose';
/*
  Base model Operations
*/
export default class BaseModel {
  /*
    The constructor recives 
    @model => mongoose Schema
    @key   => string of index key on mongooseSchema
    @data  => transitional data object {
      the purpose of this attribute its to be a two way data bind between the requisition object 
      that we could store in mongodb and result of query in data stored on mongoDB  
    }
  */
  constructor(model, key, data) {
    mongoose.Promise = Promise;
    this.model = model;
    this.key = key;
    this.data = data;
  }

  /*
    Basics crud -> ID bases
  */

  /*
    All the methods working in the same way -> 
      return a promise from the action that we try 
      to make
  */
  /*
    eg: persist()
      this.data  === req.body -> object that we want to store
      this.model === StudentSchema, BookSchema, anyStuffSchema ...

      so we return a promise to who calls the persist method and who 
      calls(that is who that actually intend to save data) 
      must have to resolve this `create` promise

  */
  persist () {
    let modelObj = new this.model(this.data);
    return this.model.create(modelObj)
  }

  getById () {
    return this.model.find({_id: this.data._id}).exec()
  }

  updateById () {
    return this.model.findByIdAndUpdate(this.data._id, this.data)
  }

  /*
    this its return the number of rows afecteds by the data update,
    not the updated objects
  */
  deleteById(){
    return this.model.findByIdAndRemove(this.data._id)
  }

  /*
    advanced API -> Simple query on modelObjects coverage
  */
  getByField (data) {
    return this.model.find(data).exec()
  }

  deleteByField (query) {
    return this.model.findOneAndRemove(query).exec()
  }

  updateByField (query) {
    return this.model.update(query, this.data)
  }

}