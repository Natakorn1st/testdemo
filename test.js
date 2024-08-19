let dataPlanner = [
    {
        event: 'createPlanner',
        topicResponse: '72ae01df9afdfeac',
        data: {
            title: 'Class',
            description: null,
            location: 'B201',
            startTime: '2024-08-16 10:33:00',
            endTime: '2024-08-16 11:33:00',
            allDay: false,
            reminders: 1,
            role: 'PT',
            username: 'PT_userName1',
            patientId: 'B201ziNq',
            poseName: [],
            qulity: [],
            type: 'Class',
            guest: [],
            roleGuest: []
        }
    },
    {
        event: 'createPlanner',
        topicResponse: '72ae01df9afdfeac',
        data: {
            title: 'Class',
            description: null,
            location: 'B201',
            startTime: '2024-08-16 11:00:00',
            endTime: '2024-08-16 12:00:00',
            allDay: false,
            reminders: 10,
            role: 'PT',
            username: 'PT_userName1',
            patientId: 'B201ziNq',
            poseName: [],
            qulity: [],
            type: 'Class',
            guest: [],
            roleGuest: []
        }
    }
];

let data = {
    event: "deletePlanner",
    topicResponse: "72ae01df9afdfeac",
    data: {
        title: "Class",
        description: null,
        location: "B201",
        startTime: "2024-08-16 11:00:00",
        endTime: "2024-08-16 12:00:00",
        allDay: false,
        reminders: 10,
        role: "PT",
        username: "PT_userName1",
        patientId: "B201ziNq",
        poseName: [],
        qulity: [],
        type: "Class",
        guest: [],
        roleGuest: []
    }
};

async function deleteDataPlanner(data) {
    const index = findDuplicateIndex(dataPlanner, data);

    if (index > -1) {
        dataPlanner.splice(index, 1);
        console.log("Deleted:", dataPlanner);
    } else {
        console.log("No match found to delete.");
    }
}

const findDuplicateIndex = (dataArray, newItem) => {
    for (let i = 0; i < dataArray.length; i++) {
        const item = dataArray[i];
        if (
            item.topicResponse === newItem.topicResponse &&
            JSON.stringify(item.data) === JSON.stringify(newItem.data)
        ) {
            return i; // Found a duplicate at index i
        }
    }
    return -1; // No duplicate found
};

// Call the deleteDataPlanner function after all functions are defined
deleteDataPlanner(data);
