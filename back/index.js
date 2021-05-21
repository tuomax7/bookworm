const express = require('express')
const app = express()

let books = [
  {
    id: 1,
    name: "Bookname 1",
    pages: 100,
    pagesRead: 0
  },
  {
    id: 2,
    name: "Bookname 2",
    pages: 200,
    pagesRead: 0
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/books', (req, res) => {
  res.json(books)
})

app.get('/api/books/:id', (request, response) => {
  const id = Number(request.params.id)
  const book = books.find(book => book.id === id)

  if(book){
  	response.json(book)
  }else{
  	response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})