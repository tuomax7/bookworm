const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


let books = [
  {
    name: "Bookname 1",
    pages: 100,
    pagesRead: 0,
    id: 1
  },
  {
    name: "Bookname 2",
    pages: 200,
    pagesRead: 0,
    id: 2
  }
]

//GETS
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/books', (req, res) => {
  res.json(books)
})

app.get('/api/books/:id', (request, response) => {
  const id = Number(request.params.id)
  const book = books.find(book => book.id === id)
  console.log(book);
})


//POSTS
app.post('/api/books', (request, response) => {

  //Creates ID
  const maxId = books.length > 0
    ? Math.max(...books.map(n => n.id)) 
    : 0



  const book = request.body
  book.id = maxId + 1

  books = books.concat(book)

  response.json(book)
})


//DELETES
app.delete('/api/books/:id', (request, response) => {
  const id = Number(request.params.id)
  books = books.filter(book => book.id !== id)

  response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})