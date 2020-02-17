//NPM packages
const mysql = require('mysql');
const util = require('util');
const fastify = require('fastify')({logger: true});
fastify.register(require('fastify-cors'), {}); // allows all cors with fastify
fastify.register(require('fastify-formbody')); // allows x-www-form-urlencoded


// Custom Libraries



//Declare variables
const dbName = "NZTA_Database";
const queries = {
    testSetsLast5:   'SELECT id, start_time, end_time, name, build_name, status, pass, fail, error FROM automated_tests ORDER BY id DESC LIMIT 5;',
    testSets2:   'SELECT id, start_time, end_time, name, build_name, status, pass, fail, error FROM automated_tests ORDER BY id DESC LIMIT 5, 5;',
    testSets3:   'SELECT id, start_time, end_time, name, build_name, status, pass, fail, error FROM automated_tests ORDER BY id DESC LIMIT 10, 5;',
    testSets4:   'SELECT id, start_time, end_time, name, build_name, status, pass, fail, error FROM automated_tests ORDER BY id DESC LIMIT 15, 5;',
    testSets5:   'SELECT id, start_time, end_time, name, build_name, status, pass, fail, error FROM automated_tests ORDER BY id DESC LIMIT 20, 5;',
    jsonData: function (id){return 'SELECT results_json FROM automated_tests WHERE id = ' + id + ';'},

};


// ======================= MYSQL code and functions =================================

// Below is the code to open the connection to the mySQL Database *********************************
async function dbOpenQryClose(dbName, qry) {
    let con2 = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "awplus",
        database: dbName
    });

    const query2 = util.promisify(con2.query).bind(con2);

    try {
        let returnQry = await query2(qry);
        con2.end();
        return returnQry;
    } catch (error) {
        console.log(error.code);
        con2.end();
        return {error: error.code}
    }
}



// =========================== fastify routes and code =====================================

// get last 5 test sets
fastify.get('/testset/1', async function (request, reply) {
    reply.send(await dbOpenQryClose(dbName, queries.testSetsLast5))
});

// get test 5-10
fastify.get('/testset/2', async function (request, reply) {
    reply.send(await dbOpenQryClose(dbName, queries.testSets2))
});

// get test 11-15
fastify.get('/testset/3', async function (request, reply) {
    reply.send(await dbOpenQryClose(dbName, queries.testSets3))
});

// get test 16-20
fastify.get('/testset/4', async function (request, reply) {
    reply.send(await dbOpenQryClose(dbName, queries.testSets4))
});

// get test 21-25
fastify.get('/testset/5', async function (request, reply) {
    reply.send(await dbOpenQryClose(dbName, queries.testSets5))
});


// get results json data from a test-set based on test set ID
fastify.post('/testsetdata/json', async function (request, reply) {
    let result = await dbOpenQryClose(dbName, queries.jsonData(request.body.id));

    result = JSON.parse(result[0].results_json); // parse the json string

    //temporary code while json-results are in an object, these results need to be changed to an array in the database
    resultArray = [];
    for (index in result){
        resultArray.push(result[index]);
    }

    reply.send(resultArray);
});


// Run the server!
fastify.listen(8086, "0.0.0.0", (err, address) => {
    if (err) throw err;
    fastify.log.info(`server listening on ${address}`)
});