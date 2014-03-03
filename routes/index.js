module.exports = function (app) {
  app.get('/', function (req, res) {
    res.sendfile('views/index.html');
  });

  app.post('/todos', function (req, res) {
    var todo = new app.Todo(req.body);
    todo.save(function (err) {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(todo));
    });
  });

  app.get('/todos', function (req, res) {
    app.Todo.find(function (err, todos) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(todos));
    })
  });

  app.get('/todos/:id', function (req, res) {
    app.Todo.findById(req.params.id, function (err, todo) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(todo));
    })
  });

  app.delete('/todos/:id', function (req, res) {
    app.Todo.findById(req.params.id, function (err, todo) {
      todo.remove(function (err) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Deleted');
      });
    })
  });

  app.put('/todos/:id', function (req, res) {
    var todo = req.body;
    delete todo._id;

    app.Todo.update({ _id: req.params.id }, todo, function (err) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Updated');
    });
  });
}