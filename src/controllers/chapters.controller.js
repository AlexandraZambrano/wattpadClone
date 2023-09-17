import Book from '../Models/books.model.js';
import Chapter from '../Models/chapter.model.js';
// Controller to create a new chapter for a specific book
export const createChapterForBook = async (req, res) => {
  const { id } = req.params; // Extract the book ID from the URL params

  try {
    // Check if the book with the specified ID exists
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Create a new chapter using the data from the request body
    const chapterData = req.body;
    const chapter = new Chapter(chapterData);

    // Save the chapter
    await chapter.save();

    // Add the chapter to the book's chapters array
    book.chapters.push(chapter);

    // Save the updated book with the associated chapter
    await book.save();

    res.status(201).json({ message: 'Chapter created successfully', chapter });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
