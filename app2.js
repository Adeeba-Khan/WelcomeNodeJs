const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res)=>{
    const url = req.url;
    const method = req.method;
    if(url==='/'){
       try{

        const data = fs.readFileSync('./message.txt', { encoding: 'utf8', flag: 'r' });
        
        // Display the file data
        //console.log(data);
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(`<body>${data}`);
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">SEND</button></form></body></html>');
        return res.end();
       }catch (err) {
        console.error('Error reading file:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
    }}
if(url==='/message' && method==='POST'){
    const body=[];

    req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
    });
    req.on('end',()=>{
        const parseBody = Buffer.concat(body).toString();
        const message = parseBody.split('=')[1];
        fs.writeFileSync('message.txt',message);
        res.statusCode = 302;
        res.setHeader('location','/');
        return res.end();
    });

    
    // res.write('<html>');


    //     res.write('<head><title>Enter Message</title></head>');
    //     res.write('<body>jhgjhgjh</body></html>');
    //     console.log(data);
    //     return res.end();
}
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
