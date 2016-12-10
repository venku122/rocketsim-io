const controllers = require('./controllers');
const mid = require('./middleware');
const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout)
  app.get('/editor',mid.requiresLogin, controllers.Editor.editor);
  app.post('/addRocket', mid.requiresLogin, controllers.Editor.addRocket);
  app.get('/profile', mid.requiresLogin, controllers.Profile.profile);
  app.get('/browseProfile', mid.requiresLogin, controllers.Browser.browseProfile);
  app.get('/browseRocket', mid.requiresLogin, controllers.Browser.browseRocket);
  app.get('/', mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
