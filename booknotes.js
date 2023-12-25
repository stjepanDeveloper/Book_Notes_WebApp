const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// start up the Express application
const app = express();

// connect to the DB
const pool = new Pool({
  user: 'postgres', /* default username in pgadmin */
  host: 'localhost', /* default hostname */
  database: 'yourdatabasenamehere', 
  password: 'yourpasswordhere', 
  port: 5432, /* default port */
}); 

// check and test the database connection
pool.query('SELECT version()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      // some error handling  in case the connection drops
    } else {
      console.log('Connected to the database:', res.rows[0]);
    }
    // do not close the connection pool here :)
});

// view engine set to ejs including setting the body parser 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));



//get routes for rendering books on the home page  and the about you page

app.get('/', (req, res) => {
    pool.query('SELECT * FROM books ORDER BY date_added DESC', (error, results) => {
      if (error) {
        console.error('Error fetching books from the database:', error);
        res.status(500).send('Database query error');
      } else {
        if (results.rows.length > 0) {
          res.render('home', { books: results.rows });
        } else {
          res.render('home', { books: [] });
        }
      }
    });
  });


app.get('/add', (req, res) => {
    res.render('add'); 
});

app.get('/about', (req, res) => {
    res.render('about');
});


// add route for adding books to the database via the form on the add.ejs
app.post('/add', (req, res) => {
    const { title, author, isbn, rating, date_added, comments } = req.body;
    
    const query = 'INSERT INTO books (title, author, isbn, rating, date_added, comments) VALUES ($1, $2, $3, $4, $5, $6)';
    pool.query(query, [title, author, isbn, rating, date_added, comments], (error, results) => {
        if (error) {
            console.error('Error adding book to the database:', error);
            res.status(500).send('Error adding book to the database');
        } else {
            res.redirect('/');
        }
    });
});

// listening on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
