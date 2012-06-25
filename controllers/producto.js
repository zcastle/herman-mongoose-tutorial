
exports.index = function (req, res, next) {
  res.render('index', { title: 'Lista de Productos'})
}

exports.show_edit = function (req, res, next) {
  res.send('show_edit')
}

exports.update = function (req, res, next) {
  res.send('update')
}

exports.remove = function (req, res, next) {
  res.send('remove')
}

exports.create = function (req, res, next) {
  res.send('create')
}
