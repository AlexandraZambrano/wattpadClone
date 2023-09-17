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
        console.log(id)//this one gisves me problm=ems+
        const book = await Book.findById({ _id: id })
        res.json(book)
    } catch (error) {
    res.json({ message: error.message });
  }
}

//CREATES A BOOK
export const createBook = async (req, res) => {
  const { title, description, genre, cover, chapters } = req.body;
  const userId = req.user._id; // Get the user ID from the request (replace with your actual method)

  console.log(userId)
  try {
    // Create a new book with the postedBy field set to the user's ID
    const book = new Book({
      title: title,
      description: description,
      genre: genre,
      cover: cover,
      postedBy: userId,
      chapters: chapters
    });

    // Save the book
    await book.save();

    res.status(200).json({ message: 'Book created successfully', book });
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

//GET THE BOOKS YOU HAVE POSTED
export const getUserBooks = async (req,res)=> {
  
  try{

    const userId = req.user._id;

    console.log(userId)// Get the user ID from the request (replace with your actual method)
    const userBooks = await Book.find({ postedBy: userId });

    res.status(200).json({ Library: userBooks })
  }  catch(err) {
        console.log(err)
    }

}