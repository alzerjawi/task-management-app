const PORT = process.env.PORT ?? 8000;
const express = require('express');
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const app = express();
const pool = require('./db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors());
app.use(express.json())

app.get('/task/:u_email', async (req, res) => {
    console.log(req);
    const { u_email } = req.params;
    console.log(u_email);
    try {
        const task = await pool.query('SELECT * FROM task WHERE u_email = $1', [u_email])
        res.json(task.rows)
    } catch (err){
            console.error(err)
        }
    }
)


app.post('/task', async(req, res) => {
    const { u_email, title, completeness, date, description } = req.body
    console.log(u_email, title, completeness, date, description)
    const id = uuidv4()
    try{
        const newTask = await pool.query('INSERT INTO task(id, u_email, title, completeness, date, description) VALUES($1, $2, $3, $4, $5, $6)', 
        [id, u_email, title, completeness, date, description])
        res.json(newTask)
    } catch (err){
        console.error(err)
    }
})

app.put('/task/:id', async (req, res) =>{
    const {id} = req.params
    const { u_email, title, completeness, date, description } = req.body
    try{
        const changeTask = await pool.query('UPDATE task SET u_email = $1, title = $2, completeness = $3, date = $4, description = $5 WHERE id = $6;', [u_email, title, completeness, date, description, id])
        res.json(changeTask)
    } catch (err){
        console.error(err)
    }
})

app.delete('/task/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const deleteTask = await pool.query('DELETE FROM task WHERE id = $1;', [id])
        res.json(deleteTask)
    } catch (err){
        console.error(err)
    }
})

app.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;
  
   
    console.log('Received login request with emailOrUsername:', emailOrUsername);
  
    try {
      const users = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [emailOrUsername, emailOrUsername]);
  
      
      console.log('Users found:', users.rows);
  
      if (!users.rows.length) {
        return res.json({ detail: 'No user with this email or username exists.' });
      }
  
      const success = await bcrypt.compare(password, users.rows[0].hashed_password);
      const token = jwt.sign({ email: users.rows[0].email }, 'secret', { expiresIn: '1hr' });
  
      if (success) {
        res.json({ email: users.rows[0].email, token });
      } else {
        res.json({ detail: 'Login failed' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ detail: 'Internal server error' });
    }
  });
  

  

  app.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;
  
    if (!email || !password || !username) {
      return res.status(400).json({ detail: 'Missing required fields for signup' });
    }
  
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
  
    try {
      const signUp = await pool.query(`INSERT INTO users (email, hashed_password, username) VALUES($1, $2, $3)`, [email, hashedPassword, username]);
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        res.json({email, token, username})
    } catch (err){
        console.error(err)
        res.status(500).json({ detail: 'Internal server error' });
    }
})

app.listen(PORT, ()=> console.log(`Backend is on port ${PORT}`))