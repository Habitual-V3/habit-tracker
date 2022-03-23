const dbController = {};
const db = require('../models/dbModels');

// Store new user's account info into Databse
dbController.saveUser = async (req, res, next) => {
  const { firstName, lastName, username, email, password } = res.locals.newUser,
  params = [firstName, lastName, username, email, password];
  try {
    const saveUserQuery = `
        INSERT INTO users (first_name, last_name, user_name, email, password)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
        `;
    const newUser = await db.query(saveUserQuery, params);
    res.locals.userId = newUser.rows[0].id;
    return next();
  } catch (error) {
    return next({
      log: 'Express error in saveUser middleware',
      status: 400,
      message: {
        err: `dbController.saveUser: ERROR: ${error}`,
      },
    });
  }
};

// Validate matching user info from frontend and database
dbController.checkUser = async (req, res, next) => {
  // res.locals.loginUser
  const { email, password } = res.locals.loginUser,
  params = [email, password];
  try {
    const checkUserQuery = `
    SELECT id AS userId FROM users
    WHERE email = $1 AND password = $2
    `;
    const result = await db.query(checkUserQuery, params);
    if (result.rows.length) {
      res.locals.userId = result.rows[0];
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
  console.log('inside dbController.getUserInfo')
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

  //[[habit_name, targetNum, fullfilled_percent]]
  // [["water", 5, 0.5], ["Make bed",NULL, 0]]

  // -----------BUG--------
  //
  //       SELECT h.habit_name, uh.target_num, uhr.fullfilled_percent
  //       FROM user_habit_records uhr
  //       LEFT OUTER JOIN habits h ON uhr.habit_id = h.id
  //       LEFT OUTER JOIN user_habits uh ON uh.habit_id = uhr.habit_id
  //       WHERE user_id=$1 AND date=(SELECT CURRENT_DATE);
  //       `;

  // Retrieve today's habit progress
  const todayRecordQuery = `
        SELECT user_id, habit_id, fullfilled_percent, habit_name
        FROM user_habit_records uhr
        JOIN habits h ON uhr.habit_id = h.id
        WHERE date=(SELECT CURRENT_DATE) AND uhr.user_id=$1`;
  const todayRecord = await db.query(todayRecordQuery, [userId]);
  console.log(todayRecord)
  res.locals.todayHabit = [];

  // Extract data from database and store into habit
  for (let row of todayRecord.rows) {
    const habit = [];
    habit.push(row.habit_id);
    habit.push(row.habit_name);
    // find target number
    const targetQuery = `
    SELECT target_num FROM user_habits
    WHERE user_id=$1 AND habit_id=$2;
    `;
    const targetNum = await db.query(targetQuery, [row.user_id, row.habit_id]);
    habit.push(targetNum.rows[0].target_num);

    // if (row.fullfilled_percent != 0 || row.fullfilled_percent != 1)
    //   habit.push(1);
    // else 
    habit.push(row.fullfilled_percent);
    res.locals.todayHabit.push(habit);
  }
  return next();
};

// add a new user-habit pair
dbController.assignHabit = async (req, res, next) => {
  // add to user-habits table
  const userId = res.locals.userId;
  const habitId = res.locals.habitId;
  const targetNum = res.locals.targetNum;
  console.log(userId, habitId, targetNum);
  const insertUserHabitQuery = `
      INSERT INTO user_habits (user_id, habit_id, target_num, active)
      VALUES ($1, $2, $3, 'true');
        `;
  const insertUserHabit = await db.query(insertUserHabitQuery, [
    userId,
    habitId,
    targetNum,
  ]);
  // add a new user-habit-record row
  const insertUHRQuery = `
      INSERT INTO user_habit_records (user_id, habit_id, date, fullfilled_percent)
      VALUES ($1, $2, (SELECT CURRENT_DATE), 0);
      `;
  const insertUHR = await db.query(insertUHRQuery, [userId, habitId]);

  // update the corresponding row in daily-count (update or create)
  return next();
};

// update today's record
dbController.updateRecord = async (req, res, next) => {
  // update user-habit-records
  const userId = res.locals.userId;
  const habitId = res.locals.habitId;
  const newNum = res.locals.newNum;

  // find target number
  const targetQuery = `
    SELECT target_num FROM user_habits
    WHERE user_id=$1 AND habit_id=$2;
    `;
  const targetNum = await db.query(targetQuery, [userId, habitId]);
  const target = targetNum.rows[0].target_num;
  //console.log(target, typeof target);
  let newPercent = 0;
  if (typeof target === 'number') {
    newPercent = newNum / target;
  } else {
    newPercent = newNum ? 1 : 0;
  }

  const updateUHRQuery = `
      UPDATE user_habit_records
      SET fullfilled_percent=$1
      WHERE user_id=$2 AND habit_id=$3 AND date=(SELECT CURRENT_DATE)
      `;
  const updateUHR = await db.query(updateUHRQuery, [
    newPercent,
    userId,
    habitId,
  ]);


  // let newDailyPercent = (Sum all fullfilled_percent from UHR) / number of habits on selected date
  // const getAllPercent
  
  // const updateDailyPercentQuery = `
  //   UPDATE daily_count
  //   SET total_percent = $1
  //   WHERE user_id = $2 AND date=(SELECT CURRENT_DATE)
  // `
  // const updateDailyPercent = await db.query(updateDailyPercentQuery, [newDailyPercent, userId])
 


  return next();
};

module.exports = dbController;
