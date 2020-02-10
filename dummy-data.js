let dummyData = [
    {test: 'test1', result: 'Pass', description: "This describes test 1", log: ['This is a longer log to test the full width of the table', "log2", 'log3','log4'], note: '', review: false},
    {test: 'test4', result: 'Pass', description: "This describes test 1", log: ['log1', "log2", 'log3','log4'], note: '', review: false},
    {test: 'test2', result: 'Fail', description: "This describes test 2", log: ['log1', "log2", 'log3'], note: 'This has a note', review: true},
    {test: 'test3', result: 'Error', description: "This describes test 3", log: ['log1', "log2", 'log3']},

];




const dummyData3 = [
    {id: 0, start_time: '2019-12-04 12:28:50', end_time: '2019-12-04 12:28:58', name: 'test-set-1', status: 'complete', build_name: 'buildname-20200101-1', pass: '3', fail: '1', error: '2', results_json: JSON.stringify(dummyData)},
    {id: 1, start_time: '2019-12-04 12:28:50', end_time: '2019-12-04 12:28:58', name: 'test-set-2', status: 'error', build_name: 'buildname-20200101-1', pass: '2', fail: '1', error: '3', results_json: JSON.stringify(dummyData)},
    {id: 2, start_time: '2019-12-04 12:28:50', end_time: '2019-12-04 12:28:58', name: 'test-set-3', status: 'inprogress', build_name: 'buildname-20200101-1', pass: '4', fail: '1', error: '2', results_json: JSON.stringify(dummyData)},
    {id: 3, start_time: '2019-12-04 12:28:50', end_time: '2019-12-04 12:28:58', name: 'test-set-4', status: 'complete', build_name: 'buildname-20200101-1', pass: '3', fail: '1', error: '2', results_json: JSON.stringify(dummyData)},
    {id: 4, start_time: '2019-12-04 12:28:50', end_time: '2019-12-04 12:28:58', name: 'test-set-5', status: 'error', build_name: 'buildname-20200101-1', pass: '2', fail: '1', error: '3', results_json: JSON.stringify(dummyData)},
    {id: 5, start_time: '2019-12-04 12:28:50', end_time: '2019-12-04 12:28:58', name: 'test-set-6', status: 'inprogress', build_name: 'buildname-20200101-1', pass: '4', fail: '1', error: '2', results_json: JSON.stringify(dummyData)},

];

