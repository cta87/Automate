console.log("loading results.js");

$(document).ready(()=>{
    console.log("Jquery ready");

    // =========================== Click methods ========================================
    $("#resultTable").on('click', ".sumrow", (event)=>{                 /// using this method any dynamically added elements will still function with the click

        console.log($(event.currentTarget).parent().next());

        $(event.currentTarget).parent().next().toggle();

    });


    // below function populates the test table when a test-set card is clicked
    $("#tstset-card-container").on('click', '.open-ts', (event)=>{


        //remove blue border from all cards, change background to white for all cards (removing blue background)
        $('.open-ts').each(function() {
            $(this).removeClass('border-primary').css("background-color", "white");

        });

        //add background color
        $(event.currentTarget).css("background-color", "lightblue");
        //add blue border around card that is open
        $(event.currentTarget).addClass('border-primary');


        // remove all old tests from test table
        $('#resultTable').children("tbody").empty();


        const id = $(event.currentTarget).prop("id");
        //get data from mysql using id (if mysql unavailable then use dummy data)

        dataFgetTests(id);

    });


    // Page load Code
    datafgetTestSets();

    //todo add code here to check for new test sets at intervals, look for new ids


});



// ============================== Element templates (use .clone() to copy them) ===============================

const noteTemplate = $("<td></td>").append($("<input>").attr("type", 'input'));

// ============================== Functions to create HTML elements ===============================

// Function creates a row in the test table with info from the individual test
const addTestRows = (testObj) =>{
    // create row elements
    let summaryRow = $("<tr></tr>");
    let logRow = $("<tr></tr>").addClass('bg-light').hide(); //hides log row

    // create table-data elements
    let tdName = $('<td></td>').text(testObj.test);
    let tdDesc = $('<td></td>').text(testObj.description);
    let tdResult = $('<td></td>').text(testObj.result).addClass('font-weight-bold');
    let tdNote = noteTemplate.clone();
    let tdReview = $('<td></td>');

    // If result = pass next tdReview contents to 'N/A' else set to checkbox. Then tick the box if it has been reviewed
    if(testObj.result.toLowerCase() === 'pass'){
        tdReview.text("N/A")
    } else {
        console.log(testObj.review);
        if(testObj.review){
            tdReview.append($("<input>").attr("type", 'checkbox').prop( "checked", true )); // create a checkbox, if review value equals true then tick the box
        } else {
            tdReview.append($("<input>").attr("type", 'checkbox')); // else create a tick box and leave unchecekd
        }
    }

    //Switch statement that sets the color of the result based whether it is a pass/fail/error
    switch (testObj.result){
        case 'Pass':
            tdResult.addClass('text-success');
            break;
        case 'Fail':
            tdResult.addClass('text-danger');
            break;
        case "Error":
            tdResult.addClass('text-warning');
            break;
    }

    //Create log list element
    let logList = $("<ol></ol>");

    if(testObj.logs){  // if log exists
        for (logIndex in testObj.logs){
            logList.append($("<li></li>").text(testObj.logs[logIndex]));
        }

        // append row data to row
        summaryRow.append($('<td></td>').addClass('text-center sumrow btn-light text-info').text("(" + testObj.logs.length + ")"), tdName, tdDesc, tdResult, tdNote, tdReview);
    } else {
        summaryRow.append($('<td></td>').addClass('text-center sumrow btn-light text-info').text("(N/A)"), tdName, tdDesc, tdResult, tdNote, tdReview);
    }


    logRow.append($("<td></td>").attr('colspan', '6').append(logList));


    //change this to a return
    $("#resultTable").append(summaryRow, logRow);

};

const addTestSetCard = (testSetObj) =>{
    let container = $('#tstset-card-container');

    // create card
    let cardContainer = $("<div></div>").addClass('card m-2 open-ts').prop("id", testSetObj.id).css('cursor', 'pointer').css("border-width", "3px");

    // create card header
    let cardHead = $("<div></div>").addClass('card-header').text(testSetObj.name);

    // create card body
    let cardBody = $("<div></div>").addClass('card-body bg-light p-1');

        // create card body elements
        let dateP = $('<p></p>').addClass('card-text text-center m-0').append($("<kbd></kbd>").text(testSetObj.start_time));
        let statusP = $('<p></p>').addClass('card-text text-center m-0').append($("<kbd></kbd>").text(testSetObj.status));
        let buildP = $('<p></p>').addClass('card-text text-center m-0').append($("<kbd></kbd>").text(testSetObj.build_name));

        let failP = $('<p></p>').addClass('card-text text-danger font-weight-bold text-center mt-1 m-0').text("Fail: " +  testSetObj.fail);
        let passP = $('<p></p>').addClass('card-text text-success font-weight-bold text-center m-0').text("Pass: " +  testSetObj.pass);
        let errorP = $('<p></p>').addClass('card-text text-warning font-weight-bold text-center m-0').text("Error: " +  testSetObj.error);


        // create card with all appended children
    cardContainer.append(cardHead, cardBody.append(dateP, statusP, buildP, failP, passP, errorP));
    container.append(cardContainer);


};

// Function that populates the test-set name select dropdown
const popSetDropdown = (nameArray) => {

    const tstSelEle = $("#tst-sel-drop");

    let uniqueNames = [];
    $.each(nameArray, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });


    for (index in uniqueNames){
        let dropItem = $('<button></button>').addClass('dropdown-item').text(uniqueNames[index]);
        tstSelEle.append(dropItem);
    }

};

// Function to show/hide loading circle, true = show, false = hide.

const loading = (IO) => {
  if (IO){
      $("#loading-spinner").show();
  } else{
      $("#loading-spinner").hide();
  }
};