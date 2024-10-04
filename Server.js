// import some dependencies/ packages

// HTTP framework for handling requests
const express = require ('express');
//Instance of express framework
const app = express ();
// DBMS Mysql 
const Mysql = require ('mysql2');
// Cross Origin Resource Sharing works hand in hand with the expres
const cors = require ('cors');
//Environment Variable Doc in your machine so that not everybody can see your PW et
const dotenv = require ('dotenv');

//
app.use(express.json());
app.use(cors());
dotenv.config();


// Connecting to the database 
const db = Mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//check if there is a connection
db.connect ((err) => {
    // if no connection
    if(err) return console.log("error connect to MYSQL");

    //if connection works
    console.log("connect to MYSQL as id: ", db.threadId);
})
//< YOUR CODE GOES DOWN HERE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Data is a file found in the Views folder 

app.get('/data', (req,res) => { 

// Question 1 Retrieve all patients
// db.query('SELECT * FROM patients', (err, results) =>{
//         if (err){
//            console.error(err);
//            res.status(500).send('Error Retrieving data')
//      }else {
//    //Display the records to the browser 
//            res.render('data', {results: results});
//      }
//  });

// Question 2 Retrieve all providers

// db.query('SELECT * FROM providers', (err, results) =>{
//     if (err){
//         console.error(err);
//         res.status(500).send('Error Retrieving data')
//     }else {
//         //Display the records to the browser 
//         res.render('dataproviders', {results: results});
//     }
// });
// Question 3 Filter patients by First Name
// db.query('SELECT * FROM patients', (err, results) =>{
//     if (err){
//        console.error(err);
//        res.status(500).send('Error Retrieving data')
//  }else {
// //Display the records to the browser 
//        res.render('datapatientsFirtsname', {results: results});
//  }
// });

// Question 4 Retrieve all providers by their specialty
db.query('SELECT * FROM providers', (err, results) =>{
    if (err){
       console.error(err);
       res.status(500).send('Error Retrieving data')
 }else {
//Display the records to the browser 
       res.render('databyspecialty', {results: results});
 }
});
});
//< YOUR CODE GOES UP HERE

//Start the server
app.listen (process.env.PORT, () =>{
    console.log (`server listening on Port ${process.env.PORT}`);
    
    // sending a messege to browser 
    console.log ('sending messege to browser...');
    app.get('/', (req, res) => {
        res.send ('Server started successfully!');

    });

});