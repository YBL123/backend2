const User = require('../models/user');
const { calcDistance } = require('../helpers/calcDistance');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const getNearestUser = async (req, res, next) => {
  if (
    !req.query.hasOwnProperty('latitude') ||
    !req.query.hasOwnProperty('longitude') ||
    !req.query.hasOwnProperty('maxDistance')
  ) {
    res
      .status(404)
      .json({
        err: 'missing either latitude, longitude or maxDistance in param query',
      });
  }

  //These are the REQUEST params
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const maxDistance = req.query.maxDistance;

  let users;
  try {
    users = await User.find();
  } catch (err) {
    res.status(400).json({ msg: err });
  }

  //NEAREST DISTANCE
  let nearest = {
    distance: undefined,
    user: null,
  };

  for (let i = 0; i < users.length; i++) {
    let distance = calcDistance(
      latitude,
      longitude,
      users[i].latitude,
      users[i].longitude
    );
    if (distance <= maxDistance) {
      // if nearest hasn't been assigned OR if going through the loop distance is smaller than nearest
      if (nearest.distance === undefined || distance < nearest.distance) {
        // reassigining nearest if true & including user
        nearest.distance = distance;
        nearest.user = users[i];
      }
    }
  }
  res.status(200).json(nearest);
};

module.exports = {
  getAllUsers,
  getNearestUser,
};
