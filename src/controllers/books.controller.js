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

  console.log(req.user)
  
  try{
    console.log(req.user)
    console.log("entra")
    const userIdToken =  req.user._id;

    console.log(userIdToken)

    const userBooks = await Book.find({ postedBy: userIdToken });

    res.status(200).json({ Library: userBooks })
  }  catch(err) {
        console.log(err)
    }

}

//LIKES ON A BOOK
export const likeBook = async (req, res) => {
  try {
    const { id } = req.params; // Get the book ID from the URL parameter
    const userId = req.user._id;
    // Get the user ID from the request body

    console.log(userId)

    // Check if the book with the given ID exists
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the user has already liked the book
    if (book.likes.includes(userId)) {
      return res.status(400).json({ message: "User already liked this book" });
    }

    // Add the user's ID to the likes array of the book
    book.likes.push(userId);

    // Save the updated book
    await book.save();

    return res.status(200).json({ message: "Book liked successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//TEST
 export const test = () => {
  
 }
