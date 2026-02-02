const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
// Middleware
app.use(express.json()); // Parse incoming JSON data
// MySQL Connection
const db = mysql.createConnection({
host: 'localhost',
user: 'root', // Replace with your MySQL username
password: 'rootpassword', // Replace with your MySQL password
database: 'pharmacy_db' // Replace with your database name
});
// Connect to MySQL
db.connect((err) => {
if (err) {
console.error('Error connecting to MySQL database:', err);
return;
}
console.log('Connected to MySQL database');
});
// Serve static files (if any)
app.use(express.static('public'));
// Route to handle adding medicine
app.post('/add-medicine', (req, res) => {
const { name, qty, expiry } = req.body;
// Insert data into the medicines table
const query = 'INSERT INTO medicines (name, quantity, expiry_date) VALUES (?, ?, ?)';
db.query(query, [name, qty, expiry], (err, result) => {
if (err) {
console.error('Error adding medicine:', err);
return res.status(500).json({ success: false, message: 'Error adding medicine' });
}
console.log('Medicine added:', result);
res.json({ success: true, message: 'Medicine added successfully' });
});
});
// Route to get all medicines (Inventory)
app.get('/inventory', (req, res) => {
const query = 'SELECT * FROM medicines';
db.query(query, (err, results) => {
if (err) {
console.error('Error fetching inventory:', err);
return res.status(500).json({ success: false, message: 'Error fetching inventory' });
}
res.json({ success: true, inventory: results });
});
});
// Route to update medicine (by ID)
app.put('/update-medicine/:id', (req, res) => {
const id = req.params.id;
const { name, qty, expiry } = req.body;
// SQL query to update the medicine details
const query = 'UPDATE medicines SET name = ?, quantity = ?, expiry_date = ? WHERE id = ?';
db.query(query, [name, qty, expiry, id], (err, result) => {
if (err) {
console.error('Error updating medicine:', err);
return res.status(500).json({ success: false, message: 'Error updating medicine' });
}
if (result.affectedRows === 0) {
return res.status(404).json({ success: false, message: 'Medicine not found' });
}
console.log('Medicine updated:', result);
res.json({ success: true, message: 'Medicine updated successfully' });
});
});
// Route to delete medicine (by ID)
app.delete('/delete-medicine/:id', (req, res) => {
const id = req.params.id;
// SQL query to delete the medicine
const query = 'DELETE FROM medicines WHERE id = ?';
db.query(query, [id], (err, result) => {
if (err) {
console.error('Error deleting medicine:', err);
return res.status(500).json({ success: false, message: 'Error deleting medicine' });
}
if (result.affectedRows === 0) {
return res.status(404).json({ success: false, message: 'Medicine not found' });
}
console.log('Medicine deleted:', result);
res.json({ success: true, message: 'Medicine deleted successfully' });
});
});
// Start the server
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});