const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(express.json())

//MONGOOSE

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const Book = require('./models/book');

const Stats = require('./models/stats');

//GETS

app.get('/api/books', (request, response) => {
  Book.find({}).then(books => {
  	response.json(books)
  })
})

app.get('/api/books/:id', (request, response) => {
  Book.findById(request.params.id).then(book => {
    response.json(book)
  })
})

app.get('/api/stats', (request, response) => {
  Stats.find({}).then(statCollection => {
  	response.json(statCollection)
  })
})

app.get('/api/stats/:id', (request, response) => {
  Stats.findById(request.params.id).then(stats => {
    response.json(stats)
  })
})


//POSTS

app.post('/api/books', (request, response) => {
  const body = request.body

  const book = new Book({
    name: body.name,
    pages: body.pages,
    pagesRead: body.pagesRead
  })

  book.save().then(savedBook => {
    response.json(savedBook)
  })
})

app.post('/api/stats', (request, response) => {
  const body = request.body

  const stats = new Stats({
    latestDayRead: body.latestDayRead,
  	readByDate: body.readByDate,
  	readingGoal: body.readingGoal,
  	totalPages: body.totalPages,
  	pagesReadToday: body.pagesReadToday,
  	streak: body.streak
  })

  stats.save().then(savedStats => {
    response.json(savedStats)
  })
})


//PUTS
app.put('/api/books/:id', (request, response) => {
  const body = request.body

  const book = {
    name: body.name,
    pages: body.pages,
    pagesRead: body.pagesRead
  }

  Book.findByIdAndUpdate(request.params.id, book, { new: true })
    .then(updatedBook => {
      response.json(updatedBook)
    })
})

app.put('/api/stats/:id', (request, response) => {
  const body = request.body

  const stats = {
    latestDayRead: body.latestDayRead,
  	readByDate: body.readByDate,
  	readingGoal: body.readingGoal,
  	totalPages: body.totalPages,
  	pagesReadToday: body.pagesReadToday,
  	streak: body.streak
  }

  Stats.findByIdAndUpdate(request.params.id, stats, { new: true })
    .then(updatedStats => {
      response.json(updatedStats)
    })
})


//DELETES

app.delete('/api/books/:id', (request, response) => {
  Book.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})