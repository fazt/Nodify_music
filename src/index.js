const path = require('path');
const ejs = require('ejs');
const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('json spaces', 4);

// middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(require('morgan')('dev'));
}

// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
