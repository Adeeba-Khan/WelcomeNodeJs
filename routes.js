const fs=require('fs');
const requestHandler=(req,res)=>{
const url = req.url;
const method = req.method;

if(url==='/'){
   try{

    const data = fs.readFileSync('./message.txt', { encoding: 'utf8', flag: 'r' });
    
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
    // const message = parseBody.split('=')[1];
    const message = parseBody.split('=')[0];//debugging
    fs.writeFile('message.txt',message, err=>{
    res.statusCode = 302;
    res.setHeader('location','/');
    return res.end();
    });
    //fs.writeFile('message.txt',message, err=>{
    // res.statusCode = 302;
   // res.setHeader('location','/');
    //return res.end();
    // });
});
}
// res.setHeader('Content-type','text/html');
// res.write('<html>');
// res.write('<head><title>My First Page</titlt></head>');
// res.write('<body><h1>Hellofrom My Node.js!</h1></body>');
// res.write('</html>');
// res.end();
}
module.exports.handler= requestHandler;
module.exports.someText = "Some hard code texts";