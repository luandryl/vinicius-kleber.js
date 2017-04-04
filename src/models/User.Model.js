'use strict';
import User from './schema/User';
import BaseModel from './Base.Model'

/*
  Model operations to User
*/
/*
  Because this class extends to BaseModel we inherit from then all the basics data Operations.
  More specifcs data operetions should be implemented here
*/
export default class UserModel extends BaseModel {
  /*
    pass data(req.params or req.body stuff) to our parent class (BaseModel)
  */
  constructor(data) {
    /*
      Calling the constructor from the parent class
      and pass to him all the config that him needs to work

      so ... magic, your crud its done :3
      try with another mongooseSchema, will work 
    */
    super(User, '_id', data)
  }
 
}