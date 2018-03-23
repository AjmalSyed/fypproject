var express = require('express'); 
var shcontroller = require('./controller/shcontroller');
var app =express();

app.set('view engine','ejs');
//static files
app.use(express.static('./assets'));
//controller
shcontroller(app);
// listen to port 3000
app.listen(3000);
