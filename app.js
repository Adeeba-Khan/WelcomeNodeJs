
const http = require('http');
const fs = require('fs');
const routes= require('./routes');
const server = http.createServer(routes.handler);
console.log(routes.someText);
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});