import React from 'react';
import { BrowserRouter as Router, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { BookOverviewContainer } from './book/components/BookOverview/BookOverviewContainer';
import styles from './App.module.scss';
import { RemoteBooksService } from './book/services/RemoteBooksService';
import { BookDetailsContainer } from './book/components/BookDetails/BookDetailsContainer';

const bookService = new RemoteBooksService();

export const App = () => (
  <Router>
    <div>
      <nav className={styles['nav-bar']}>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink to="/book-app/books" activeClassName="active" className="nav-link">Book Overview</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/book-app/book" exact activeClassName="active" className="nav-link">New Book</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Redirect exact from="/" to="/book-app/books"/>
        <Route path="/book-app/book/:id?" component={BookDetailsContainer} />
        <Route path="/book-app/books" component={BookOverviewContainer} />
      </Switch>
    </div>
  </Router>
);
