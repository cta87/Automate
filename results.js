$(document).ready(()=>{
    console.log("Jquery ready");
    console.log(dummyData);

    // =========================== Click methods ========================================
    $("#resultTable").on('click', ".sumrow", (event)=>{                 /// using this method any dynamically added elements will still function with the click

        console.log($(event.currentTarget).parent().next());

        $(event.currentTarget).parent().next().toggle();

    });

    addTest(dummyData[0]);
    addTest(dummyData[1]);
    addTest(dummyData[2]);
    addTest(dummyData[3]);

});

// ============================== Element templates (use .clone() to copy them) ===============================

const noteTemplate = $("<td></td>").append($("<input>").attr("type", 'input'), $("<button></button>").text("Update").addClass('btn btn-success'));

// ============================== Functions to create HTML elements ===============================

const addTest = (testObj) =>{
    // create row elements
    let summaryRow = $("<tr></tr>");
    let logRow = $("<tr></tr>").addClass('bg-light').hide(); //hides log row

    // create table-data elements
    let tdName = $('<td></td>').text(testObj.name);
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

    for (logIndex in testObj.log){
        logList.append($("<li></li>").text(testObj.log[logIndex]));
    }

    // append row data to row

    summaryRow.append($('<td></td>').addClass('text-center sumrow btn-light text-info').text("(" + testObj.log.length + ")"), tdName, tdDesc, tdResult, tdNote, tdReview);
    logRow.append($("<td></td>").attr('colspan', '6').append(logList));

    //change this to a return
    $("#resultTable").append(summaryRow, logRow);

};