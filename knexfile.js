// Update with your config settings.

module.exports = {
    client: 'sqlite3',
    connection: {
      filename: './data/user-tracker.db3'
    },
    useNullAsDefault:true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    // needed when using foreign keys
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on foreign key enforcement
      },
    },
}
