const mongoose = require("mongoose");

// Suppress Mongoose strictQuery warning
mongoose.set("strictQuery", false);

// MongoDB Connection
mongoose.connect("mongodb+srv://norkart:7nQ6n3jFDudBmQC@navas.ceezf.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("✅ MongoDB connected successfully!");
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed:", error);
    });

// Define Schema
const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create Model
const LogInCollection = mongoose.model("LogInCollection", logInSchema);

module.exports = LogInCollection;
