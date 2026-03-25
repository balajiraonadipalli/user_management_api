const db = require("../database/db");

exports.getUsers = (req, res) => {
    let { search, sort = "id", order = "ASC" } = req.query;
    let query = "SELECT * FROM users";
    let params = [];
    if (search) {
        query += " WHERE name LIKE ? OR email LIKE ?";
        params.push(`%${search}%`, `%${search}%`);
    }
    query += ` ORDER BY ${sort} ${order}`;

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "User not found" });
        res.json(row);
    });
};

exports.createUser = (req, res) => {
    const { name, email, age } = req.body;
    db.run(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
        [name, email, age],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.status(201).json({ id: this.lastID, name, email, age });
        }
    );
};

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    db.run(
        "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
        [name, email, age, id],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: "User not found" });
            res.json({ id: Number(id), name, email, age });
        }
    );
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: `User ${id} deleted successfully` });
    });
};
