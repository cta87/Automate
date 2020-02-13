console.log("loading data-fetch.js");

const datafServ = "http://10.36.250.112:8086";

const datafUrls ={
    last5: datafServ + "/testset/5",
    testData: datafServ + "/testsetdata/json",
};


// =============================== Functions ======================================


// Function get the last 5 test sets and populates the test set table
const datafgetTestSets = async () => {
    loading(true);

    let testSetArray = [];

    await $.get(datafUrls.last5, function( data ) {

        for (dataIndex in data){
            testSetArray.push(data[dataIndex].name);
            addTestSetCard(data[dataIndex]);
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
