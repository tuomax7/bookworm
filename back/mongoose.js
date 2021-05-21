
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://bookworm_admin:${password}@bookwormcluster.pbwp8.mongodb.net/bookworm?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const bookSchema = new mongoose.Schema({
  name: String,
  pages: Number,
  pagesRead: Number,
})

const Book = mongoose.model('Book', bookSchema)

const book = new Book({
    name: "Bookname 1",
    pages: 100,
    pagesRead: 0,
})

Book.find({}).then(result => {
  result.forEach(book => {
    console.log(book)
  })
  mongoose.connection.close()
})
