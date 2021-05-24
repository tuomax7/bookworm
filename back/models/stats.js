const mongoose = require('mongoose')

const statsSchema = new mongoose.Schema({
  latestDayRead: Date,
  readByDate: Date,
  readingGoal: Number,
  totalPages: Number,
  pagesReadToday: Number,
  streak: Number
})

statsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Stats', statsSchema)