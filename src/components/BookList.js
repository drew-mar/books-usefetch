import { useState } from "react"
// import useFetch hook
import { useFetch } from '../hooks/useFetch'

export default function BookList() {
  // url state
  const [url, setUrl] = useState('http://localhost:3001/books')
  // invoke useFetch hook & destructre books data 
  const { data: books, isLoading, error } = useFetch(url)

  return (
    <div className="book-list">
      <h2>React Books</h2>
      <ul>
        <div className="filters">
          <button onClick={() => setUrl('http://localhost:3001/books')}>All Books</button>
          <button onClick={() => setUrl('http://localhost:3001/books?genre=Mystery')}>Mystery</button>
          <button onClick={() => setUrl('http://localhost:3001/books?genre=Fiction')}>Fiction</button>
          <button onClick={() => setUrl('http://localhost:3001/books?genre=Sci-Fi')}>Sci-Fi</button>
          <button onClick={() => setUrl('http://localhost:3001/books?genre=Productivity')}>Productivity</button>
        </div>

        {/* show loading message while fetching data */}
        {isLoading && <div>Loading...</div>}
        {/* show error message */}
        {error && <div>{error}</div>}

        {/* output books array if not null  */}
        {books && books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.rating}</p>
            <p>{book.author}</p>
          </li>
        ))}
      </ul>

    </div>
  )
}
