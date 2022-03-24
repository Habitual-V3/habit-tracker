const dbController = {};
const db = require('../models/dbModels');

// Store new user's account info into Databse
dbController.saveUser = async (req, res, next) => {
  const firstName = res.locals.firstname
  const lastName = res.locals.lastname
  const username = res.locals.username
  const email = res.locals.email
  const password = res.locals.password

  const params = [firstName, lastName, username, email, password];
  const saveUserQuery = `
      INSERT INTO users (first_name, last_name, user_name, email, password)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
      `;
  const newUser = await db.query(saveUserQuery, params);
  res.locals.userId = newUser.rows[0].id;
  return next();
};

// Validate matching user info from frontend and database
dbController.checkUser = async (req, res, next) => {
  // res.locals.loginUser
  const { email, password } = res.locals.loginUser,
  params = [email, password];
  try {
    const checkUserQuery = `
    SELECT id AS userId, first_name FROM users
    WHERE email = $1 AND password = $2
    `;
    const result = await db.query(checkUserQuery, params);
    if (result.rows.length) {
      res.locals.user = result.rows[0];
      return next();
    }
    return next({
      log: 'No such user or pw dont match',
      status: 400,
      message: {
        err: `dbController.checkUser: no such user or pw dont match`,
      },
    });
  } catch (error) {
    return next({
      log: 'Express error in checkUser middleware',
      status: 400,
      message: {
        err: `dbController.checkUser: ERROR: ${error}`,
      },
    });
  }
};

// return past history and today's record
dbController.getUserInfo = async (req, res, next) => {
  //console.log('inside dbController.getUserInfo')
  const userId = res.locals.userId;

  // Get Calendar current date and its the past 27 days
  const calendarQuery = `
      SELECT total_percent, date FROM daily_count
      WHERE user_id=$1 AND date BETWEEN (SELECT CURRENT_DATE)-integer'27' AND (SELECT CURRENT_DATE)
      ORDER BY date;
        `;
  // Populate calendarArray with 28 days
  const habitRecord = await db.query(calendarQuery, [userId]);
  res.locals.calendarRecord = [];
  for (let i = 0; i < 28 - habitRecord.rows.length; i++) {
    res.locals.calendarRecord.push(0);
  }
  for (let row of habitRecord.rows) {
    res.locals.calendarRecord.push(Number(row.total_percent));
  }

  // Get today's habit progress
  const todayHabitQuery = `
    SELECT * FROM user_habit_records
    WHERE date=(SELECT CURRENT_DATE) AND user_id=$1
    `;
  
  // Retrieve users' habits
  const usersHabits = `
    SELECT id, target_num, habit_name, current_num
    FROM users
    JOIN user_habits ON users.id=user_habits.user_id
    WHERE users.id=$1`

  const savedHabits = await db.query(usersHabits, [userId]);
  res.locals.habits = savedHabits.rows;

  return next();
};

// add a new user-habit pair
dbController.assignHabit = async (req, res, next) => {
  //console.log('inside dbController.assignHabit')
  // add to user-habits table
  const userId = res.locals.userId;
  const habitName = res.locals.habitName;
  const targetNum = res.locals.targetNum;
  const currentNum = res.locals.currentNum
  const activeBool = true
  const insertUserHabitQuery = `
      INSERT INTO user_habits (user_id, habit_name, target_num, active, current_num)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
        `;

  const newHabit = await db.query(insertUserHabitQuery, [
    userId,
    habitName,
    targetNum,
    activeBool, 
    currentNum
  ]);

  res.locals.newHabit = newHabit.rows
  return next();
};

// update today's record
dbController.updateRecord = async (req, res, next) => {

  const userId = res.locals.userId;
  const habitName = res.locals.habitName;
  const currentNum = res.locals.currentNum;
  
  const updateCurrentNum = `
    UPDATE user_habits
    SET current_num = $1
    WHERE user_id = $2 AND habit_name = $3;`

  const updatedNum = await db.query(updateCurrentNum, [currentNum, userId, habitName]);

  
  // find target number
  const targetQuery = `
    SELECT target_num, current_num FROM user_habits
    WHERE user_id=$1 AND habit_name=$2;
    `;
  const targetNum = await db.query(targetQuery, [userId, habitName]);

  const target = targetNum.rows[0].target_num;
  const current = targetNum.rows[0].current_num;

  let newPercent = current / target;

  const updateUHRQuery = `
      UPDATE user_habit_records
      SET fulfilled_percent=$1
      WHERE user_id=$2 AND habit_name=$3 AND date=(SELECT CURRENT_DATE)
      RETURNING *;
      `;
  
  const habitInfo = await db.query(updateUHRQuery, [
    newPercent,
    userId,
    habitName,
  ]);

  console.log('-----------habitInfo here', habitInfo.rows[0])
  res.locals.habit = habitInfo.rows[0];

  return next();
};

dbController.deleteHabit = async(req, res, next) => {
  const userId = res.locals.userId;
  const habitName = res.locals.habitName;

  const deleteQuery = `
    DELETE FROM user_habits
    WHERE user_id=$1 AND habit_name=$2;
  `
  await db.query(deleteQuery, [userId, habitName])
  return next()
}
module.exports = dbController;
