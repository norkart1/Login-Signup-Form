const express = require("express");
const path = require("path");
const hbs = require("hbs");
const LogInCollection = require("./mongo");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Paths
const templatePath = path.join(__dirname, './templates'); // FIXED PATH
app.set('views', templatePath);

const publicPath = path.join(__dirname, "../public");

// View Engine Setup
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));

// Routes
app.get("/", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));

app.post("/signup", async (req, res) => {
    try {
        const { name, password } = req.body;
        const existingUser = await LogInCollection.findOne({ name });

        if (existingUser) {
            return res.send("User already exists. <a href='/'>Login here</a>");
        }

        await LogInCollection.create({ name, password });
        res.redirect("/");
    } catch (err) {
        res.send("Error in signup. Please try again.");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await LogInCollection.findOne({ name });

        if (!user || user.password !== password) {
            return res.send("Invalid login. <a href='/'>Try again</a>");
        }

        res.render("home", { naming: name });
    } catch (err) {
        res.send("Error in login. Please try again.");
    }
});

// Server Start
app.listen(port, () => console.log(`Server running on port ${port}`));
