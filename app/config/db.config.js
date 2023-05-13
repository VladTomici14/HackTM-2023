module.exports = {
    HOST: "localhost",
    USER: "app",
    PASSWORD: "app",
    PORT: '5433',
    DB: "app", // use the testdb
    dialect: "postgresql",
    pool: {
        max: 5, // the maximum number of connections in pool
        min: 0, // the minimum number of connections in pool
        acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before error
        idle: 10000 // the maximum time, in milliseconds, that connection can be idle before being released
    }
}

