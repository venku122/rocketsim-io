const models = require('../models');

// import models

// default fake database


// object to track last object

// host pages
const hostEditor = (req, res) => {
  res.render('editor');
};

const hostIndex = (req, res) => {
  res.render('editor');
};

const saveRocket = (req, res) => {
  // error check
  if (!req.body.description || !req.body.statistics || !req.body.components) {
    return res.status(400).json({ error: 'Complete rocket object required' });
  }

  const rocketData = {
    description: req.body.description,
    statistics: req.body.statistics,
    components: req.body.components,
  };

  //rocketData.description.author = req.session.account._id;
  rocketData.description.author = req.session.account._id;
  console.log(rocketData.statistics);
  const newRocket = new models.Rocket.RocketModel(rocketData);

  return newRocket.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }
    console.log(newRocket);
    //return res.json({ redirect: '/profile' });
    return res.json({});
  });
};


// export variables
module.exports = {
  editor: hostEditor,
  index: hostIndex,
  addRocket: saveRocket,
};
