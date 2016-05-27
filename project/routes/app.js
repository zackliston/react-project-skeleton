module.exports = function init(app) {
  app.get('*',
    function get(req, res) {
      res.render('app');
    }
  );
}
