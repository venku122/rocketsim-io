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
    return res.render('profile', { rockets: docs });
  });
};

// export variables
module.exports = {
  profile: hostProfile,
};
