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

//LIKES ON A CHAPTER
export const likeChapter = async (req, res) => {
  try {
    const { id } = req.params; // Get the book ID from the URL parameter
    const userId = req.user._id;
    // Get the user ID from the request body

    console.log(userId)

    // Check if the book with the given ID exists
    const chapter = await Chapter.findById(id);

    if (!chapter) {
      return res.status(404).json({ message: "chapter not found" });
    }

    // Check if the user has already liked the chapter
    if (chapter.likes.includes(userId)) {
      return res.status(400).json({ message: "User already liked this chapter" });
    }

    // Add the user's ID to the likes array of the book
    chapter.likes.push(userId);

    // Save the updated chapter
    await chapter.save();

    return res.status(200).json({ message: "Book liked successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//SAVES A COMMENT BY A USER
export const commentChapter = async(req, res) => {
  try{ 
    const { chapterId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const chapter = await Chapter.findById(chapterId)

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    const comment = {
      text,
      user: userId,
    };

    chapter.comments.push(comment);

    await chapter.save();

    res.status(200).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }

}