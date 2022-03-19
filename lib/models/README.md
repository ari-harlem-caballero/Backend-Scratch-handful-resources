# Models

This folder will hold all your app's models. Models are what are used for interacting with the database. Any interaction with a database should go through a model. A general convention with models is that their filenames are capitalized and singular (e.g. `User.js`).

Models manage our data. They are responsible for the shape of our data and retrieving that data from a data store.

The model will then expose an interface to the rest of the application. Any other file doesn't need to concern itself with how the data is managed.


<!-- // pool, utils

//module.ex === class Charc (id; quote; etc;)
//constructor(row) this. row.
//insert (all params, Ins(ea param)/Val($1)/Ret)
//getAll (Sel/From, return map)
//getID (Sel/Fr/Wh)
//update (id/attributes)
  // current (await Charc(id))
  // update (spread curr, spread att)
  // const {att} = update
  // Update, Set(att=$1), Wh(id), Ret
  // if !rows, return
//delete(id) (Del from, wh, ret) -->
