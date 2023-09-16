import Book from "../Models/books.model.js";

//GETS ALL BOOKS
export const getAllBooks = async(req, res) => {
    try{
        const books = await Book.find()
        res.status(200).json(books)
    }catch(error){
        res.satatus(500).json({ message: error.message })
    }
}

//GETS A BOOK
export const getBook = async (req, res) => {
    try {
        const id = req.params.id
        const book = await Book.findById({ _id: id })
        res.json(book)
    } catch (error) {
    res.json({ message: error.message });
  }
}

//CREATES A BOOK
export const createBook = async (req, res) => {
    try {
      await Book.create(req.body);
      res.status(200).json({ 
        message: "Book created succesfully" 
    });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//UPDATES A BOOK
export const updateBook = async (req, res) => {
    try {
      const id = req.params.id
      await Book.updateOne({ _id: id }, req.body).then(res => {
      })
      res.status(200).json({
        "message": "Book updated successfully"
      })
    } catch (error) {
      res.json({ message: error.message })
    }
  }

//DELETES A BOOK
export const deleteBook = async (req, res) => {
    try {
      const id = req.params.id
      await Book.deleteOne({ _id: id }).then(res => {
      })
      res.status(200).json({
        "message": "Book deleted sucessfully"
      })
    } catch (error) {
      res.json({ message: error.message })
    }
  }