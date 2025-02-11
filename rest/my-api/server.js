const express = require("express");
const db = require("./db");
const app = express();
const PORT = 3000;

app.use(express.json());

// GET semua user
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// GET user by ID
app.get("/users/:id", (req, res) => {
    db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) throw err;
        results.length ? res.json(results[0]) : res.status(404).json({ message: "User tidak ditemukan" });
    });
});

// POST tambah user baru
app.post("/users", (req, res) => {
    db.query("INSERT INTO users (name) VALUES (?)", [req.body.name], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, name: req.body.name });
    });
});

// PUT update user
app.put("/users/:id", (req, res) => {
    db.query("UPDATE users SET name = ? WHERE id = ?", [req.body.name, req.params.id], (err, result) => {
        if (err) throw err;
        result.affectedRows ? res.json({ id: req.params.id, name: req.body.name }) : res.status(404).json({ message: "User tidak ditemukan" });
    });
});

// DELETE user
app.delete("/users/:id", (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
        if (err) throw err;
        result.affectedRows ? res.json({ message: "User dihapus" }) : res.status(404).json({ message: "User tidak ditemukan" });
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
