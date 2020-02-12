console.log("loading data-fetch.js");

const datafServ = "http://10.36.250.112:8086";

const datafUrls ={
  last5: datafServ + "/testset/5",
};


// =============================== Functions ======================================



const datafgetTestSets = async () => {

    let testSetArray = [];

    await $.get('http://10.36.250.112:8086/testset/5', function( data ) {

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

};
