const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')
const blog = require('./public/Blog/blog.json');
const multer = require('multer');



app.use(express.static('public')); // default

app.get('', (req, res) => {
    res.send(indexHtmlContent);
});
app.get('/blog', (req, res) => {
    res.send(indexHtmlContent)
})
app.get('/about', (req, res) => {
    res.send(indexHtmlContent)
})

const handler = (req, res) => res.send(path.join(__dirname, "public/index.html"))
const routes = ['/', '/blog', '/about'];
routes.forEach(route => app.get(route, handler))

app.get('/api/Blogs', (req, res) => {
    res.json(blog);
})

var filepath = '/public/Blog/images/';

app.get('/api/Blog/images/:blogImage', (req, res) => {
    const {blogImage} = req.params
    res.sendFile(__dirname + filepath + String(blogImage));
})

app.get('/admin', (req, res) => {
    res.write(admin);
    res.end();
})

app.post('/success', upload.single('filetoupload'), async(req, res) => {
    var data ={
        id: blog.length + 1,
        path: path.basename(req.file.path.replace(/\\/g, "/").replace("public/", "")),
        tag: req.body.tag,
        time: new Date().toISOString().toLocaleString().replace("T", " ").replace('Z', ""),
        heading: req.body.heading,
        post: req.body.post
    }
    console.log(req.file.path)
    var cp = [...blog, data]
    fs.writeFile('./public/Blog/blog.json', JSON.stringify(cp), function(err){
        if(err) return console.log(err);
    });
    res.write('<h1>Successfully</h1>')
    res.end()
})

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});