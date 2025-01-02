const http = require('http');

const server = http.createServer((req, res) => {
   

    // Handling different URLs
    if (req.url === '/home') {
        res.end('Welcome home');
    } else if (req.url === '/about') {
        res.end('Welcome to About Us page');
    } else if (req.url === '/node') {
        res.end('Welcome to my Node Js project');
    } else {
        res.end('Page not found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
