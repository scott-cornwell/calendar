const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// serve static assets normally
app.use(express.static(__dirname + '/public/'));

//fallback for spa
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(port);
console.log("server started on port " + port);
