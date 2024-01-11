const express = require('express');
const path = require('path');
const fs = require('fs')
const uuid = require('./Develop/public/helpers/uuid');
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request received to get reviews`);
    console.info(`${req.method} request received to get reviews`);
  });

  app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
  
    const note = req.body;
  
    if (note) {
      const newNote = {
        note,
        review_id: uuid(),
      };
  
      const reviewString = JSON.stringify(newNote);
  
      fs.writeFile(`./db/db.json`, reviewString, (err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote} has been written to JSON file`
            )
      );
  
      const response = {
        status: 'success',
        body: newReview,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });
  
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );