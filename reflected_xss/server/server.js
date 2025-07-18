const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const todo = req.query.todo || "";
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Reflected XSS - To-do List</title>
        <style>
          body {
            font-family: sans-serif;
            padding: 20px;
          }
          ul {
            padding-left: 1rem;
          }
          li {
            margin-bottom: 0.5rem;
          }
        </style>
      </head>
      <body>
        <h2>Reflected XSS To-do List</h2>
        <form method="GET" action="/">
          <input type="text" name="todo" placeholder="Enter a task" />
          <input type="submit" value="Add" />
        </form>

        <ul id="todoList">
          ${todo ? `<li>${todo}</li>` : ""}
        </ul>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Reflected XSS To-do app running at http://localhost:3000");
});
