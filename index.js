const express = require("express");
const data = require("./data.json");

const portNumber = 8000;

const app = express();

const getPersons = (req, res) => {
  const limit =
    typeof req.query.limit !== "undefined" ? parseInt(req.query.limit, 10) : 10;

  let result = [];

  if (req.query.gender) {
    result = data.filter((elem) => elem.gender === req.query.gender);
  } else {
    result = data;
  }

  result = result.slice(0, limit);

  res.json(result);
};

const getPerson = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const person = data.find((elem) => elem.id === id);

  if (person) {
    res.send(person);
  } else {
    res.sendStatus(404);
  }
};

app.get("/person", getPersons);
app.get("/person/:id", getPerson);

app.listen(portNumber, () => console.log("ok server"));
