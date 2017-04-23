var promise = require('bluebird');
var options = { promiseLib: promise };
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://chengjiu:password@localhost:5432/usersdb';
var db = pgp(connectionString);
module.exports = {db};
