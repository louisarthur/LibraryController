import React, { Component } from 'react';
import { FaBook, FaSpinner, FaPlus, FaSearch } from 'react-icons/fa';
import Container from '../../components/container/index';
import { Form, SubmitButton, List, Span } from './styles';
import StringCompare from 'string-similarity';

export default class Main extends Component {
  state = {
    newTitle: '',
    newAuthor: '',
    newPagesBook: 0,
    newBookread: false,
    books: [],
    loading: false,
  };

  componentDidMount() {
    const books = localStorage.getItem('books');
    if (books) {
      this.setState({ books: JSON.parse(books) });
    }
  }
  // salvando o localstorage
  componentDidUpdate(_, prevState) {
    const { books } = this.state;
    if (prevState.books !== books) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  handleDelete = book => {
    this.setState({
      books: this.state.books.filter(t => t !== book),
    });
  };
  handleChangeRead = book => {
    let books = this.state.books;
    let index = this.state.books.findIndex(t => t === book);

    books[index] = {
      ...books[index],
      read: book.read ? false : true,
    };
    this.setState({ books: books });
  };

  handleStateChangeTitle = async q => {
    // this.state.books.map(book => {
    //   const ola = StringCompare.compareTwoStrings(q.target.value, book.title);
    //   // console.log(ola);
    // });
    // console.log(Object.keys(q.target.value).length);

    // console.log(q.target.value.size);
    // this.state.books.map(book => console.log(book.title));
    this.setState({ newTitle: q.target.value });
  };
  handleStateChangeAuthor = w => {
    this.setState({ newAuthor: w.target.value });
  };
  handleStateChangeNumberPages = r => {
    this.setState({ newPagesBook: r.target.value });
  };
  handleStateChangeRead = k => {
    this.setState({ newBookread: k.target.value });
  };

  handleSubmitState = async z => {
    z.preventDefault();
    this.setState({ loading: true });
    const {
      newTitle,
      newAuthor,
      newPagesBook,
      newBookread,
      books,
    } = this.state;
    const bookSchema = {
      title: newTitle,
      author: newAuthor,
      pages: newPagesBook,
      read: newBookread,
    };
    this.setState({
      books: [...books, bookSchema],
      newTitle: '',
      newAuthor: '',
      newBookread: false,
      newPagesBook: 0,
      loading: false,
    });
  };

  render() {
    const { newTitle, newAuthor, newPagesBook, loading, books } = this.state;
    return (
      <Container>
        <h1>
          <FaBook /> Books
        </h1>
        <h1>
          <FaSearch />
          Pesquisar
        </h1>

        <Form onSubmit={this.handleSubmitState}>
          <input
            type="text"
            placeholder="Add title"
            value={newTitle}
            onChange={this.handleStateChangeTitle}
          />

          <input
            type="text"
            placeholder="Add Author"
            value={newAuthor}
            onChange={this.handleStateChangeAuthor}
          />

          <input
            type="number"
            placeholder="Add pages number"
            value={newPagesBook}
            min="0"
            max="10000"
            onChange={this.handleStateChangeNumberPages}
          />

          <select name="read" onChange={this.handleStateChangeRead}>
            <option value={false}>Unread</option>
            <option value={true}>Read</option>
          </select>

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#222" size={15} />
            ) : (
              <FaPlus color="#222" size={15} />
            )}
          </SubmitButton>
        </Form>
        {!newTitle ? (
          <List>
            {books.map(book => (
              <li key={book.title}>
                {/* <img src="" alt=""/> */}
                <span>{book.title}</span>
                <span>{book.author}</span>
                <span>{book.pages}</span>
                {book.read ? <span>Read</span> : <span>Unread</span>}
                <Span>
                  {book.read ? (
                    <button
                      type="button"
                      onClick={() => this.handleChangeRead(book)}
                    >
                      Unread
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => this.handleChangeRead(book)}
                    >
                      Read
                    </button>
                  )}
                  <button type="button" onClick={() => this.handleDelete(book)}>
                    Remove
                  </button>
                </Span>
              </li>
            ))}
          </List>
        ) : (
          <List>
            {books.map(book =>
              StringCompare.compareTwoStrings(newTitle, book.title) > 0.1 ? (
                <li key={book.title}>
                  {/* <img src="" alt=""/> */}
                  <span>{book.title}</span>
                  <span>{book.author}</span>
                  <span>{book.pages}</span>
                  {book.read ? <span>Read</span> : <span>Unread</span>}
                  <Span>
                    {book.read ? (
                      <button
                        type="button"
                        onClick={() => this.handleChangeRead(book)}
                      >
                        Unread
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => this.handleChangeRead(book)}
                      >
                        Read
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => this.handleDelete(book)}
                    >
                      Remove
                    </button>
                  </Span>
                </li>
              ) : (
                <Span>Not Found</Span>
              )
            )}
          </List>
        )}
      </Container>
    );
  }
}
