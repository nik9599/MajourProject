const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

class DatabaseSingleton {
  constructor() {
    if (DatabaseSingleton.instance) {
      return DatabaseSingleton.instance;
    }

    // this.pool = new Pool({
    //   user: process.env.USER,
    //   host: process.env.HOST,
    //   database: process.env.DATABASE,
    //   password: process.env.PASSWORD,
    //   port: process.env.DB_PORT,
    // });

    this.pool = new Pool({
      connectionString: process.env.POSTGRES_URL ,
    })


    DatabaseSingleton.instance = this;
  }

  static getInstance() {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new DatabaseSingleton();
    }
    return DatabaseSingleton.instance;
  }
}

module.exports = DatabaseSingleton.getInstance();
