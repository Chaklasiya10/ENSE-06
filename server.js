const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));

});

// Route to handle login form submission
app.post("/app", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    // for the example
    console.log("Email:", email);
    console.log("Password:", password);


    fs.readFile(path.join(__dirname, "users.json"), (err, data) => {
        if (err) {
            console.error("Could note read users.json", err);

            return;
        }

        // Parse the JSON data and find the user

        const users = JSON.parse(data);
        let user = null;
        //console.log(users);
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === password) {
                user = users[i];  // Store the matching user object
                break;  // Exit the loop once we find the match
            }
        }
        if (user) {

            res.sendFile(path.join(__dirname, "public", "votepage.html"));
        } else {

            res.redirect("/");
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
