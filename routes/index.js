const express = require('express');
const db = require('./../mysql/app');
const mysql = require('mysql');
const session = require('express-session');



const router = express.Router();
var path = __dirname + '/views/';
 
const https = require('https');

 

var bodyParser = require('body-parser');
var app = express();
app.use(session({secret: 'ssshhhhh'}));
app.use(express.static(__dirname+'/'));
router.use(bodyParser.urlencoded({
   extended: true
}));
//router.use(bodyParser.json());

var sess; // global session, NOT recommended

router.get('/', (req, res) => {
   res.sendFile(path + "login.html");
});
 
router.get('/register', (req, res) => {
    res.sendFile(path + "register.html");
 });

 router.get('/pictures', (req, res) => {
    res.sendFile(path + "pictures.html");
 });

 router.get('/allpictures', (req, res) => {
    res.sendFile(path + "allpictures.html");
 });

 router.get('/pictures/api/grabpicture/:id', (req, res) => {
    //console.log(req.params.id)
    res.sendFile(__dirname + "/photos/"+req.params.id);
 });
 router.get('/allpictures/api/grabpicture/:id', (req, res) => {
    //console.log(req.params.id)
    res.sendFile(__dirname + "/photos/"+req.params.id);
 });
 const upload = require('express-fileupload')
 const fs = require('fs');

router.use(upload())
 router.post("/api/upload/:id", function(req, res) {
    if (req.files){
        // console.log(req.files)
        var file = req.files.file;
        var filename = file.name;
        // console.log(filename)


        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'picturealbum',
            });
        
            connection.connect((err) => {
            if(err){
                console.log(err)
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
            });

            var id = req.params.id;
            console.log(id)
            connection.query('INSERT INTO posts (posterEmail,postText,time,category,picpoints) VALUES ("'+id+'","temp",22,"temp",0);', (err,resp) => {
                if(err) throw err;
                //res.send(resp)
                file.mv(__dirname + '/photos/'+resp.insertId + '.jpg',function (err){
                    if (err){
                        res.send(err)
                    }else{
                        res.sendFile(path + "pictures.html");
                    }
                })
            });
        
        connection.end((err) => {
        });


        
    }

});

 router.get('/api/getPictures', (req, res) => {
    console.log(req.query)
   var id = req.query.id;

    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'picturealbum',
    });

    connection.connect((err) => {
    if(err){
        console.log(err)
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
    });

    connection.query('SELECT * FROM posts WHERE posterEmail="'+id+'" ORDER BY picpoints DESC;', (err,rows) => {
        if(err) throw err;
        console.log(rows.length + 'pictures sent')
        res.send(rows)
    });

    connection.end((err) => {
    });
 });

 router.get('/api/incrementVotes', (req, res) => {
    console.log(req.query)
   var id = req.query.id;
console.log(id)
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'picturealbum',
    });

    connection.connect((err) => {
    if(err){
        console.log(err)
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
    });
    var x;
    connection.query('UPDATE posts SET picpoints = picpoints + 1 Where id ='+id, (err,rows) => {
        if(err) throw err;
        
      });
    
      
    

    // connection.query('SELECT * FROM posts WHERE posterEmail="'+id+'";', (err,rows) => {
    //     if(err) throw err;
    //     console.log(rows.length + 'pictures sent')
    //     res.send(rows)
    // });

    connection.end((err) => {
    });
    res.send('Done')
 });


 router.get('/api/getAllPictures', (req, res) => {
    console.log(req.query)
   var id = req.query.id;

    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'picturealbum',
    });

    connection.connect((err) => {
    if(err){
        console.log(err)
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
    });

    connection.query('SELECT * FROM posts ORDER BY picpoints DESC;', (err,rows) => {
        if(err) throw err;
        console.log(rows.length + 'pictures sent')
        res.send(rows)
    });

    connection.end((err) => {
    });
 });

router.get("/api/login/", function(req, res){
   console.log(req.query)
   var username = req.query.username;
   var password = req.query.password;

    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'picturealbum',
    });

    connection.connect((err) => {
    if(err){
        console.log(err)
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
    });

    connection.query('SELECT * FROM users WHERE username ="'+username+'" AND password="'+password+'";', (err,rows) => {
        if(err) throw err;
        if (rows.length>0){
            console.log(rows[0])
            res.send((rows[0]))
        }else{
            res.send('Rejected')
        }
    });

    connection.end((err) => {
    });
});
 
router.get("/orders/", function(req, res){
   res.status(200).json({"ee":"qwe"})
});
 
module.exports = router;