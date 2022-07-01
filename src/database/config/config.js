const config = require('../../config')
module.exports = {
    "development": {
        "username": config.db.development.username,
        "password": config.db.development.password,
        "database": config.db.development.database,
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "use_env_variable": config.db.development.url,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    }
}