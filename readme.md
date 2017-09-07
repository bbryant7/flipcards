```The application must:

[]Have user registration, login, and logout
[] Allow the user to create multiple decks of flipcards
[] Allow the user to create flipcards within a deck
[] Allow the user to edit a flipcard
[] Allow the user to delete a flipcard
[] Allow the user to start a quiz using a flipcard deck
[] Ideally, this quiz would show the cards randomly
[] When a flipcard is flipped, allow the user to choose whether they answered
[] successfully or unsuccessfully, and record that answer
[] The application must have an API that:

Allows registration
[] Have HTTP basic authentication
[] Allows flipcard decks to be created
[] Allows flipcards to be created, edited, and deleted
```

Basic Set-up:
npm init and npmignore node
create files
  app.js
  readme.md
  views
    - mustache files
  models
    - schema.js
  public
    - css files
  install modules:
    express
    mustache
    mustache-express
    mongoose
    bluebird
    passport
    body parser
create mongo db for User Data
create schema for User Data
