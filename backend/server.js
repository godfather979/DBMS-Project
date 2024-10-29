const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "bahe7g2wwvdsclhaydag-mysql.services.clever-cloud.com",
    user : "ud1lrtrlrruzxqlp",
    password : "xbcULXW4UrcYPJOMEDvP",
    database : "bahe7g2wwvdsclhaydag",
})

app.get('/',(req,res) => {
    return res.json("From backend")

})


//route to get players
app.get('/Tables', (req,res) =>{
    const sql = "show tables";
    db.query(sql, (err,data) =>{
        if(err)
            return res.json(err);
        else
            return res.json(data);
    })
})

//route to get players
app.get('/Players', (req,res) =>{
    const sql = "select* from Players";
    db.query(sql, (err,data) =>{
        if(err)
            return res.json(err);
        else
            return res.json(data);
    })
})

//route to add players
app.post('/Players', (req, res) => {
    console.log("Received body:", req.body); // Check incoming data
    const {first_name, last_name, sport, date_of_birth } = req.body;

    // const player_id_int = parseInt(player_id, 10);

    const sql = "INSERT INTO Players (first_name, last_name, sport, date_of_birth) VALUES (?, ?, ?, ?)";
    db.query(sql, [first_name,last_name, sport, date_of_birth], (err, data) => {
        if (err) {
            console.error("Error inserting player:", err.message);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Duplicate entry for player_id' });
              }
              
              return res.status(500).json({ error: 'Failed to add player' });
            }
            return res.status(201).json({ message: 'Player added successfully', data });
    });
});

//route to update players
app.put('/Players/:id', (req, res) => {
    console.log("Received body for update:", req.body); // Check incoming data
    const { first_name,last_name, sport, date_of_birth } = req.body;
    const { id: player_id } = req.params; // Extract player ID from URL

    const sql = "UPDATE Players SET first_name = ?, last_name = ?, sport = ?, date_of_birth = ? WHERE player_id = ?";
    
    db.query(sql, [first_name,last_name, sport, date_of_birth, player_id], (err, data) => {
        if (err) {
            console.error("Error updating player:", err.message);
            return res.status(500).json({ error: 'Failed to update player' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Player not found' });
        }

        return res.status(200).json({ message: 'Player updated successfully' });
    });
});

//route to delete players
app.delete('/Players/:id', (req, res) => {
    const { id: player_id } = req.params; // Extract player ID from URL

    const sql = "DELETE FROM Players WHERE player_id = ?";

    db.query(sql, [player_id], (err, data) => {
        if (err) {
            console.error("Error deleting player:", err.message);
            return res.status(500).json({ error: 'Failed to delete player' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Player not found' });
        }

        return res.status(200).json({ message: 'Player deleted successfully' });
    });
});


app.listen(5000, () => {
    console.log("Listening on port 5000");
})