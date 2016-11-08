const controllers = require('./controllers');

const router = (app) => {
  app.get('/login', controllers.Account.loginPage);
  app.post('/login', controllers.Account.login);
  app.get('/signup', controllers.Account.signupPage);
  app.post('/signup', controllers.Account.signup);
  app.get('/logout', controllers.Account.logout);
  app.get('/editor', controllers.Editor.editor);
  app.post('/addRocket', controllers.Editor.addRocket);
  app.get('/profile', controllers.Profile.profile);
  app.get('/', controllers.Account.loginPage);
};

module.exports = router;
