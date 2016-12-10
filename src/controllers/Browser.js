const models = require('../models');

// import models

// default fake database

// object to track last object

// host pages
const hostBrowserProfile = (req, res) => {
  models.Account.AccountModel.findAccounts((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred' });
    }
    console.log(docs);
    return res.render('profileBrowser', {users: docs});
  });
};

const hostBrowserRocket = (req, res) => {
  models.Rocket.RocketModel.FindAll((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred' });
    }
    console.log(docs);
    return res.render('rocketBrowser', {rockets: docs});
  });
};

// export variables
module.exports = {
  browseProfile: hostBrowserProfile,
  browseRocket: hostBrowserRocket,
};
