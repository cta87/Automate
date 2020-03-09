console.log("loading data-fetch.js");

// ====================== Declare variables and constants ======================

const datafServ = "http://10.36.250.112:8086";

const datafUrls ={
    testSetLast: '/testset/last',
    testSet1: datafServ + "/testset/1",
    testSet2: datafServ + "/testset/2",
    testSet3: datafServ + "/testset/3",
    testSet4: datafServ + "/testset/4",
    testSet5: datafServ + "/testset/5",
    testData: datafServ + "/testsetdata/json",
};

let latestSetId = 0;

// =============================== Functions ======================================


// Returns the id from the last test set, use to watch for new test sets
const datafIdWatch = async () => {
    console.log('Running data-fetch.datafIdWatch:');

    let returnId;

    await $.get(datafServ + datafUrls.testSetLast, function(data){

        // only return id if test is 'complete'
        if(data[0].status === 'complete'){returnId = data[0].id;} else {returnId = 0}

    });

    return returnId
};

// Function get the last 5 test sets and populates the test set table
const datafgetTestSets = async (testSetUrl) => {
    console.log('Running data-fetch.datafgetTestSets:');
    loading(true);

    let testSetArray = [];

    await $.get(testSetUrl, function( data ) {

        for (dataIndex in data){
            testSetArray.push(data[dataIndex].name);
            addTestSetCard(data[dataIndex]);

            // If any of the test sets ID are higher than 'latestSetId', set 'latestSetId' to be the new higher value
            if (latestSetId < data[dataIndex].id){latestSetId = data[dataIndex].id}

        }

    }).catch(err => {

        console.log("api unreachable using dummy data");
        for (dataIndex in dummyData3) {
            testSetArray.push(dummyData3[dataIndex].name);
            addTestSetCard(dummyData3[dataIndex]);
        }
    });
    popSetDropdown(testSetArray);
    loading();
};

const dataFgetTests = async (id) => {
    loading(true);

    await $.post(datafUrls.testData, {id: id}, function(result){
        console.log(result);
            for (dataIndex in result){

                addTestRows(result[dataIndex]);
            }

    }).catch(err => {
      console.log('error')
    });

    loading();
};
