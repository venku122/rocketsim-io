const controllers = require('./controllers');

const router = function (app) {
  app.get('/editor', controllers.editor);
  app.get('/', controllers.index);

  // post requests
  //app.post('/addRocket', controllers.addRocket);
};

module.exports = router;
