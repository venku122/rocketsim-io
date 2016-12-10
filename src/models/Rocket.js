const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let RocketModel = {};
const convertId = mongoose.Types.ObjectId;

const RocketSchema = new mongoose.Schema({
// description
  description: [{
    name: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    createdData: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'Account',
    },
  }],

// statistics
  statistics: [{
    deltaV: {
      type: Number,
      min: 0,
    },
    stages: {
      type: Number,
      min: 0,
    },
    cost: {
      type: Number,
      min: 0,
    },
    mass: {
      type: Number,
      min: 0,
    },
  }],

// components
  components: {
    type: Array,
    default: [],
  },
});

/*
RocketSchema.statics.toAPI = doc => ({

});*/

RocketSchema.statics.findByAuthor = (authorId, callback) => {
  const search = {
    'description.author' : convertId(authorId),
  };

  return RocketModel.find(search).exec(callback);
};

RocketSchema.statics.FindAll = ( callback) => {

  /*const search = {
    'description.author' : convertId(authorId),
  };*/

  return RocketModel.find().exec(callback);
};


RocketModel = mongoose.model('Rocket', RocketSchema);

module.exports.RocketModel = RocketModel;
module.exports.RocketSchema = RocketSchema;
