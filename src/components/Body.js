import React, { useEffect, useState } from "react";

const Body = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
  });

  useEffect(() => {
    fetch("https://bookstore-backend-azure.vercel.app/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      alert("Title and Author are required!");
      return;
    }
    const response = await fetch(
      "https://bookstore-backend-azure.vercel.app/api/books",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const newBook = await response.json();
    setBooks([...books, newBook]);
    setFormData({ title: "", author: "", description: "" });
  };

  const handleDeleteBook = async (id) => {
    await fetch(`https://bookstore-backend-azure.vercel.app/api/books/${id}`, {
      method: "DELETE",
    });
    setBooks(books.filter((book) => book._id !== id));
  };

  return (
    <main className="p-4">
      <form
        onSubmit={handleAddBook}
        className="bg-white p-4 rounded shadow-md max-w-md mx-auto mb-8"
      >
        <h2 className="text-lg font-semibold mb-4">Add New Book</h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div key={book._id} className="bg-gray-100 p-4 rounded shadow-md">
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-gray-700">{book.author}</p>
            <p className="text-gray-500">{book.description}</p>
            <button
              onClick={() => handleDeleteBook(book._id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Body;
