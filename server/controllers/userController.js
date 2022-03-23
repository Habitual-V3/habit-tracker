const userController = {};

// Rextract and save new user's account info from frontend into res.locals
userController.addUser = (req, res, next) => {
  const userProps = ['firstName', 'lastName', 'username', 'email', 'password'];
  res.locals.newUser = {};

  for (const prop of userProps) {
    if (!req.body[prop]) {
      return next({
        log: 'UserController.addUser ERROR: Properties on request body undefined',
        message: {
          err: 'UserController.addUser ERROR: Incorrect data received',
        },
      });
    }
    res.locals.newUser[prop] = req.body[prop];
  }
  return next();
};

// Extract user email/pw from frontent, and store into res.locals
userController.checkUser = (req, res, next) => {
  const userProps = ['email', 'password'];
  res.locals.loginUser = {};

  for (const prop of userProps) {
    if (!req.body[prop]) {
      return next({
        log: 'UserController.checkUser ERROR: Properties on request body undefined',
        message: {
          err: 'UserController.checkUser ERROR: Incorrect data received',
        },
      });
    }
    res.locals.loginUser[prop] = req.body[prop];
  }
  return next();
};

// Get user email from feed request
userController.getUserInfo = (req, res, next) => {
  console.log('inside userController.getUserInfo')
  const userId = req.body.userId;
  if (!userId)
    return next({
      log: 'UserController.getUserInfo ERROR: No user id given',
      message: {
        err: 'UserController.getUserInfo ERROR: No user id given',
      },
    });
  res.locals.userId = userId;
  return next();
};

userController.assignHabit = (req, res, next) => {
  const { userId, habitName, targetNum } = req.body;
  const habitPairs = {
    Water: 1,
    'Make Bed': 2,
    'Walk Dog': 3,
    'Sleep on Time': 4,
    Stretch: 5,
  };
  res.locals.userId = userId;
  res.locals.habitId = habitPairs[habitName];
  res.locals.targetNum = targetNum;
  return next();
};

userController.updateRecord = (req, res, next) => {
  const { userId, habitName, newNum } = req.body;
  const habitPairs = {
    Water: 1,
    'Make Bed': 2,
    'Walk Dog': 3,
    'Sleep on Time': 4,
    Stretch: 5,
  };
  res.locals.userId = userId;
  res.locals.habitId = habitPairs[habitName];
  res.locals.newNum = newNum;
  return next();
};

module.exports = userController;
