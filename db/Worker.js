const colors = require('colors');
const sqlite3 = require('sqlite3').verbose();


module.exports = class Worker {
  constructor(dbName) {
    this.dbName = dbName;
  }

  createStudio(name) {
      const studio = [name];
      const sql = 'INSERT INTO studios(name) VALUES (?)';
      const db = new sqlite3.Database(this.dbName, (err) => {
        if (err) {
          return console.error(colors.red(err.message));
        }
        console.log('Connected to the SQLite database'.green);
        return true;
      });

      db.run(sql, studio, (err) => {
        if (err) {
          return console.log(colors.red(err.message));
        }
        console.log(colors.green(studio) + ' added to DB');
        return true;
      });

      db.close((err) => {
        if (err) {
          return console.error(colors.red(err.message));
        }
        console.log('Close the database connection'.green);
        return true;
      });
  }
  updateStudio(id, name) {
    const studio = [name, id];
    const sql = 'UPDATE studios SET name = ? WHERE id = ?';


    const db = new sqlite3.Database(this.dbName, (err) => {
      if (err) {
        return console.error(colors.red(err.message));
      }
      console.log('Connected to the SQLite database'.green);
      return true;
    });

    db.run(sql, studio, (err) => {
      if (err) {
        return console.log(colors.red(err.message));
      }
      console.log(`Row updated with new info: ${studio}`.green);
      return true;
    });

    db.close((err) => {
      if (err) {
        return console.error(colors.red(err.message));
      }
      console.log('Close the database connection'.green);
      return true;
    });
}
}