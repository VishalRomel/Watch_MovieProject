const express = require('express');
const mysql = require('mysql2');
const { route } = require('../app');

// Module to handle GET request on localhost:3000 and load the registration form
exports.form = (req, res) =>
{  
    console.log("successs")
    // Send the registration form HTML file as a response
    res.sendFile('public/form.html', { root: '.' })
}  

// Module to handle POST request on localhost:3000 when the user submits the registration form
// Form data is captured and sent back as a response
exports.formprocess = async (req, res) =>
{  
   // Extract email, password, and username from the request body
   const email = req.body.mail
   const password = req.body.password
   const username =  req.body.username

   try {
       // Check if the user already exists
       const userExists = await doesUserExist(username, email, password);
       if (userExists) {
           console.log("User Already Exist");
           // Redirect to homePage.html if the user exists
           res.redirect('/homePage.html');
       } else { 
           // Insert user data into the database if the user doesn't exist
           console.log("New user created");
           const result = await createUser(email, password, username);            
           // Redirect to homePage.html
           res.redirect('/homePage.html');
       }
   } catch (error) {
       // Handle errors and send an error response
       console.error(error);
       res.status(500).json({ success: false, error: 'Internal Server Error' });
   }

   // End the response
   res.end();
}  

// Create a MySQL connection pool with promise support
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'perfect_ad452',
    database: 'MovieDB'
  }).promise()

// Asynchronous function to check if a user with the given username, email, and password exists
async function doesUserExist(username, userEmail, userPassword) {
    const [result] = await pool.query(`
        SELECT COUNT(*) as count
        FROM users
        WHERE username = ? AND email = ? AND user_password = ?
    `, [username, userEmail, userPassword]);

    return result[0].count > 0;
}

// Asynchronous function to create a new user in the database
async function createUser(userEmail, userPassword, username) {
    const [result] = await pool.query(`
        INSERT INTO users (username, email, user_password)
        VALUES (?, ?, ?)
    `, [username, userEmail, userPassword]);

    return result;
}


