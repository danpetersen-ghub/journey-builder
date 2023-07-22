import { displayDataTable } from './ui.mjs';
//keeping track of sorting order
export const sortOrders = {
    id: 'desc',
    column1: 'asc',
    column2: 'asc',
};

//This function will sort the rows in the table based on the clicked column
export function sortTable(sortKey, sortOrder) {
    // Toggle sort order
    sortOrders[sortKey] = sortOrders[sortKey] === 'desc' ? 'asc' : 'desc';
    sortOrder = sortOrders[sortKey];

    //send data to api endpoint
    const headers = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    //send data to api endpoint to get data
    const response = fetch("/api/data", headers);
    console.log("Sent Req to: /api/all/data");

    //log out the response, then log response
    response
        .then((response) => response.json())
        .then((responseJSON) => {
            let records = responseJSON.data;
            records.sort((a, b) => {
                if (sortOrder === 'desc') {
                    if (a[sortKey] < b[sortKey]) return -1;
                    if (a[sortKey] > b[sortKey]) return 1;
                    return 0;
                } else {
                    if (a[sortKey] < b[sortKey]) return 1;
                    if (a[sortKey] > b[sortKey]) return -1;
                    return 0;
                }
            });
            displayDataTable(records);
        });
}