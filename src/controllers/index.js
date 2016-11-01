const models = require('../models');

// import models

//default fake database


//object to track last object

// host pages
const hostEditor = (req, res) => {
  res.render('editor');
};

const hostIndex = (req, res) => {
  res.render('editor');
};


// export variables
module.exports = {
  editor: hostEditor,
  index: hostIndex,
};
