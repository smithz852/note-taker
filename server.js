const express = require('express');
const path = require('path');
const fs = require('fs')
const uuid = require('./Develop/public/helpers/uuid');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./Develop/public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
   fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
    // console.log(data)
    res.json(JSON.parse(data));
   })
  });

  app.post('/api/notes', (req, res) => {
  console.log(req.body);
    const {title, text} = req.body;
    
  
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      const reviewString = JSON.stringify(newNote);
      fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
        // console.log(data)
        let oldNotes = JSON.parse(data);
        oldNotes.push(newNote)
       
      fs.writeFile(`./Develop/db/db.json`, JSON.stringify(oldNotes), (err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote} has been written to JSON file`
            )
      );
  
      const response = {
        status: 'success',
        body: oldNotes,
      };
  
      console.log(response);
      res.status(201).json(response);
    })
    } else {
      res.status(500).json('Error in posting review');
    }
  })
  
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );