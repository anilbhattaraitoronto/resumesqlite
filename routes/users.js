const express = require("express");
const app = express();
const session = require("express-session");
const sessionStore = require("connect-sqlite3")(session);

const router = express.Router();
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

//send the login/register forms to the users
router.get("/userauth", (req, res) => {
    res.render(
        "users/userauth",
        { title: "Login/Register", user: req.session.user },
    );
});

//send in profile page to the user
router.get("/profile", (req, res) => {
    if (req.session.loggedin === true) {
        res.render(
            "users/profile",
            { title: "User Profile", user: req.session.user },
        );
    } else {
        res.redirect("/users/userauth");
    }
});

//register new user
router.post("/register", (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirm_password;
    if (password === confirmPassword) {
        //open database
        let hashedPassword = bcrypt.hashSync(password, salt);
        const DB = new sqlite3.Database("./resumedb.sqlite", (err) => {
            try {
                let sql = `SELECT * from users WHERE email = ? AND username = ?;`;
                DB.all(sql, [email, username], (err, rows) => {
                    if (err) {
                        res.render("users/userauth", {
                            errorMessage: "Something is not quite right",
                            title: "Login/Register",
                        });
                        return;
                    }

                    if (rows.length === 0) {
                        let insertSql =
                            `INSERT INTO users (email, username, password) values (?,?,?);`;
                        DB.run(
                            insertSql,
                            [email, username, hashedPassword],
                            (err) => {
                                if (err) {
                                    res.render("users/userauth", {
                                        errorMessage: "Something is amiss. Sorry. Please try again",
                                        title: "Login/Register",
                                    });
                                    return;
                                }

                                DB.close((err) => {
                                    if (err) {
                                        res.render("users/userauth", {
                                            errorMessage: "Something is not quite right",
                                        });
                                        return;
                                    }
                                    req.session.success =
                                        `Welcome ${username}! You have successfully registered with your email: ${email}. Please log in.`;
                                    res.redirect("/");
                                });
                            },
                        );
                    } else {
                        res.render("users/userauth", {
                            errorMessage:
                                "The user already exists or the email is used by another user. Please retry. Sorry!",
                            title: "Login/Register",
                        });
                    }
                });
            } catch {
                res.render("users/userauth", {
                    errorMessage: "Something went wrong.",
                    title: "Login/Register",
                });
            }
        });
    } else {
        res.render(
            "users/userauth",
            {
                errorMessage: "Sorry! Passwords do not match.",
                title: "Login/Register",
            },
        );
    }
});

//log the authenticated user in
router.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    //   let hashedPassword = bcrypt.hashSync(password, salt);
    if (username && password) {
        //open the database
        let DB = new sqlite3.Database("./resumedb.sqlite", (err) => {
            if (err) {
                res.render("users/userauth", {
                    title: "Login/Register",
                    errorMessate: "Something not quite right",
                });
            } //else
            let sql = `SELECT * from users WHERE username = ?;`;
            DB.all(sql, [username], (err, rows) => {
                if (rows.length > 0) {
                    let hashedPassword = rows[0].password;
                    bcrypt.compare(password, hashedPassword, (err, result) => {
                        if (result === true) {
                            req.session.loggedin = true;
                            req.session.user = rows[0];
                            req.session.success = "Thank you for logging in"
                            res.redirect("/");
                        } else {
                            res.render("users/userauth", {
                                title: "Login/Register",
                                errorMessage: "Credentials Mismatch",
                            });
                        }
                    });
                } else {
                    res.render("users/userauth", {
                        title: "Login/Register",
                        errorMessage:
                            "Either the user does not exist. If so register first. Or use correct username",
                    });
                }
            });
        });
        //create sql statement to check
    } else {
        res.render("users/userauth", {
            title: "Login/Register",
            errorMessage:
                "Both username and passwords are required. Please try again.",
        });
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        console.log("Successfully logged out");
    });

    res.redirect("/");
});

module.exports = router;
