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


//route to get tables
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
    const sql = "select* from PlayerView";
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


//route to get fans
app.get('/Fans', (req,res) =>{
    const sql = "select* from Fans";
    db.query(sql, (err,data) =>{
        if(err)
            return res.json(err);
        else
            return res.json(data);
    })
})

//route to add fans
app.post('/Fans', (req, res) => {
    console.log("Received body:", req.body); // Check incoming data
    const {first_name, last_name } = req.body;

    // const fan_id_int = parseInt(fan_id, 10);

    const sql = "INSERT INTO Fans (first_name, last_name) VALUES (?, ?)";
    db.query(sql, [first_name,last_name], (err, data) => {
        if (err) {
            console.error("Error inserting fan:", err.message);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Duplicate entry for fan_id' });
              }
              
              return res.status(500).json({ error: 'Failed to add fan' });
            }
            return res.status(201).json({ message: 'Fan added successfully', data });
    });
});

//route to update fans
app.put('/Fans/:id', (req, res) => {
    console.log("Received body for update:", req.body); // Check incoming data
    const { first_name,last_name } = req.body;
    const { id: fan_id } = req.params; // Extract fan ID from URL

    const sql = "UPDATE Fans SET first_name = ?, last_name = ? WHERE fan_id = ?";
    
    db.query(sql, [first_name,last_name,fan_id], (err, data) => {
        if (err) {
            console.error("Error updating fan:", err.message);
            return res.status(500).json({ error: 'Failed to update fan' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Fan not found' });
        }

        return res.status(200).json({ message: 'Fan updated successfully' });
    });
});

//route to delete fans
app.delete('/Fans/:id', (req, res) => {
    const { id: fan_id } = req.params; // Extract fan ID from URL

    const sql = "DELETE FROM Fans WHERE fan_id = ?";

    db.query(sql, [fan_id], (err, data) => {
        if (err) {
            console.error("Error deleting fan:", err.message);
            return res.status(500).json({ error: 'Failed to delete fan' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Fan not found' });
        }

        return res.status(200).json({ message: 'Fan deleted successfully' });
    });
});
// Route to get all coaches
app.get('/Coaches', (req, res) => {
    const sql = "SELECT * FROM Coaches";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching coaches:", err.message);
            return res.status(500).json({ error: 'Failed to fetch coaches' });
        }
        return res.status(200).json(data);
    });
});

// Route to add a new coach
app.post('/Coaches', (req, res) => {
    console.log("Received body:", req.body); // Check incoming data
    const { first_name, last_name, experience, sport } = req.body;

    const sql = "INSERT INTO Coaches (first_name, last_name, experience, sport) VALUES (?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, experience, sport], (err, data) => {
        if (err) {
            console.error("Error inserting coach:", err.message);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Duplicate entry for coach_id' });
            }
            return res.status(500).json({ error: 'Failed to add coach' });
        }
        return res.status(201).json({ message: 'Coach added successfully', data });
    });
});

// Route to update a coach
app.put('/Coaches/:id', (req, res) => {
    console.log("Received body for update:", req.body); // Check incoming data
    const { first_name, last_name, experience, sport } = req.body;
    const { id: coach_id } = req.params; // Extract coach ID from URL

    const sql = "UPDATE Coaches SET first_name = ?, last_name = ?, experience = ?, sport = ? WHERE coach_id = ?";
    
    db.query(sql, [first_name, last_name, experience, sport, coach_id], (err, data) => {
        if (err) {
            console.error("Error updating coach:", err.message);
            return res.status(500).json({ error: 'Failed to update coach' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Coach not found' });
        }

        return res.status(200).json({ message: 'Coach updated successfully' });
    });
});

// Route to delete a coach
app.delete('/Coaches/:id', (req, res) => {
    const { id: coach_id } = req.params; // Extract coach ID from URL

    const sql = "DELETE FROM Coaches WHERE coach_id = ?";

    db.query(sql, [coach_id], (err, data) => {
        if (err) {
            console.error("Error deleting coach:", err.message);
            return res.status(500).json({ error: 'Failed to delete coach' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Coach not found' });
        }

        return res.status(200).json({ message: 'Coach deleted successfully' });
    });
});
// Route to fetch all doctors
app.get('/Doctors', (req, res) => {
    const sql = "SELECT * FROM Doctors"; // Ensure your table name is correct
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching doctors:", err.message);
            return res.status(500).json({ error: 'Failed to fetch doctors' });
        }
        return res.status(200).json(data);
    });
});

// Route to add a new doctor
app.post('/Doctors', (req, res) => {
    console.log("Received body:", req.body); // Check incoming data
    const { first_name, last_name, specialization, institute_id } = req.body; // Removed player_id

    const sql = "INSERT INTO Doctors (first_name, last_name, specialization, institute_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [first_name, last_name, specialization, institute_id], (err, data) => {
        if (err) {
            console.error("Error inserting doctor:", err.message);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Duplicate entry for doctor_id' });
            }
            return res.status(500).json({ error: 'Failed to add doctor' });
        }
        return res.status(201).json({ message: 'Doctor added successfully', data });
    });
});

// Route to update a doctor
app.put('/Doctors/:id', (req, res) => {
    console.log("Received body for update:", req.body); // Check incoming data
    const { first_name, last_name, specialization, institute_id } = req.body; // Removed player_id
    const { id: doctor_id } = req.params; // Extract doctor ID from URL

    // Corrected SQL query without a trailing comma
    const sql = "UPDATE Doctors SET first_name = ?, last_name = ?, specialization = ?, institute_id = ? WHERE doctor_id = ?";
    
    db.query(sql, [first_name, last_name, specialization, institute_id, doctor_id], (err, data) => {
        if (err) {
            console.error("Error updating doctor:", err.message);
            return res.status(500).json({ error: 'Failed to update doctor' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        return res.status(200).json({ message: 'Doctor updated successfully' });
    });
});

// Route to delete a doctor
app.delete('/Doctors/:id', (req, res) => {
    const { id: doctor_id } = req.params; // Extract doctor ID from URL

    const sql = "DELETE FROM Doctors WHERE doctor_id = ?";

    db.query(sql, [doctor_id], (err, data) => {
        if (err) {
            console.error("Error deleting doctor:", err.message);
            return res.status(500).json({ error: 'Failed to delete doctor' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        return res.status(200).json({ message: 'Doctor deleted successfully' });
    });
});

// Route to fetch all events
app.get('/events', (req, res) => {
    const sql = "SELECT * FROM Events"; // Ensure your table name is correct
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching events:", err.message);
            return res.status(500).json({ error: 'Failed to fetch events' });
        }
        return res.status(200).json(data);
    });
});

// Route to add a new event
app.post('/events', (req, res) => {
    console.log("Received body:", req.body); // Check incoming data
    const { event_name, event_date, location, description } = req.body; // Extract fields including description

    const sql = "INSERT INTO Events (event_name, event_date, location, description) VALUES (?, ?, ?, ?)";
    db.query(sql, [event_name, event_date, location, description], (err, data) => {
        if (err) {
            console.error("Error inserting event:", err.message);
            return res.status(500).json({ error: 'Failed to add event' });
        }
        return res.status(201).json({ message: 'Event added successfully', data });
    });
});

// Route to update an event
app.put('/events/:id', (req, res) => {
    const { id: event_id } = req.params; // Extract event ID from URL
    const { event_name, event_date, location, description } = req.body; // Extract fields including description

    const sql = "UPDATE Events SET event_name = ?, event_date = ?, location = ?, description = ? WHERE event_id = ?";
    db.query(sql, [event_name, event_date, location, description, event_id], (err, data) => {
        if (err) {
            console.error("Error updating event:", err.message);
            return res.status(500).json({ error: 'Failed to update event' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        return res.status(200).json({ message: 'Event updated successfully' });
    });
});

// Route to delete an event
app.delete('/events/:id', (req, res) => {
    const { id: event_id } = req.params; // Extract event ID from URL

    const sql = "DELETE FROM Events WHERE event_id = ?";
    db.query(sql, [event_id], (err, data) => {
        if (err) {
            console.error("Error deleting event:", err.message);
            return res.status(500).json({ error: 'Failed to delete event' });
        }

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        return res.status(200).json({ message: 'Event deleted successfully' });
    });
});




app.listen(5000, () => {
    console.log("Listening on port 5000");
})