var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();
app.use(
    serveStatic('./public/')
);
app.listen(5000);
console.log('listening to port 5000...');
