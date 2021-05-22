const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(express.json())

//MONGOOSE
const Book = require('./models/book')


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


//PUTS
app.put('/api/books/:id', (request, response, next) => {
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