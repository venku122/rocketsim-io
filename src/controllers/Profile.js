const models = require('../models');

// import models

// default fake database

// object to track last object

// host pages
const hostProfile = (req, res) => {
  models.Rocket.RocketModel.findByAuthor(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred' });
    }
    console.log(docs);
    return res.render('profile', { rockets: docs, profile: req.session.account });
  });
};

const hostOtherProfile = (req, res) => {

  models.Rocket.RocketModel.findByAuthor(req.query.profileID, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred' });
    }
    console.log(docs);
    models.Account.AccountModel.findByID(req.query.profileID, (err, doc2)=> {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'an error occurred' });
      }
      console.log(docs);
      return res.render('profile', { rockets: docs, profile: doc2});
    });
  });
};

// export variables
module.exports = {
  profile: hostProfile,
  otherProfile: hostOtherProfile,
};
