# Book_Notes_WebApp
Web application for book collections. Books are rated and sorted in the postgresql database.  It also utilizes Open Library API for fetching the book covers. 


Open Library API is free to use just check out their documentation it is easy to use.
I used the ISBN to to identify the book covers from the Open Library database but you can use other identifiers if you wish.
You will need postgresql installed and pgadmin for ease of use to the database. It also makes the queries and viewing easier.

The web app is made out of 3 routes : home, about and add each used for it's respective purpose.

Add route is used to load up the form for adding books.
Home route renders the library and shows the books with the covers fetched from the API.
About route is a short descriptive page about the app and how to use it.

Whole application is Harry Potter themed including the backgrounds and the font.

The font can be downloaded from https://www.dafont.com/ just search for "Harry Potter".


