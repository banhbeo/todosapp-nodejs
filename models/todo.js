module.exports = function (db) {
  
  var todoSchema = new db.Schema({
    title: String,
    completed: Boolean
  });

  return db.model('Todo', todoSchema);
}