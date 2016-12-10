const models = require('../models');

const hostRocketStats = (req, res) => {
  models.Rocket.RocketModel.findByID(req.query.rocketID, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'an error occurred' });
    }
    console.log('returning a rocket');
    console.log(docs);
    return res.render('statistics', { rocket: docs });
  });
};




// export variables
module.exports = {
  rocket: hostRocketStats,
};
