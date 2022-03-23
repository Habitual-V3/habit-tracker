const { Pool } = require('pg');

// Link to ElephantSQL DB
const PG_URI =
  'postgres://lygurdee:v1JUAhV3B0kYxC9yAE5qyFoWzvUPdV1R@kashin.db.elephantsql.com/lygurdee';

// Establish connection to DB
const pool = new Pool({
  connectionString: PG_URI,
});

// Query to DB
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed query', text);
    return pool.query(text, params, callback);
  },
};
