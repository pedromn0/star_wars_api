// First Solution

// Solution using setTimeout to solve the situation
// of dealing with the fact consolo.log was being complete
// fist that my function what was responsible to not give any
// contend to data. So with the delay of 500 mls this was solve.

// let xhr = new XMLHttpRequest();
// let data;

// xhr.open("GET", "https://ci-swapi.herokuapp.com/api/");

// xhr.send();

// xhr.onreadystatechange = function() {
//     console.log(this.readyState);
//     if (this.readyState == 4 && this.status == 200) {
//         data = JSON.parse(this.responseText);
//     }
// };

// setTimeout(function() {
//     console.log(data);
// }, 500);

// --------------------------
// Second Solution

const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData (type, cb) {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", baseURL + type + '/');

    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

// getData(function(data){
//     console.log(data);
// });

function getTableHeaders (obj) {
    let tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`)
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick='writeToDocument('${prev}')';>Previous</button>`
        `<button onclick='writeToDocument('${next}')';>Next</button>`
    } else if (next && !prev) {
        return `<button onclick='writeToDocument('${next}')';>Next</button>`
    } else if (!next && prev) {
        `<button onclick='writeToDocument('${prev}')';>Previous</button>`
    }
}

function writeToDocument (type) {
    let tableRows = [];
    let el = document.getElementById('data');
    el.innerHTML = " ";
    
    getData(type, function(data) {
        let pagination;
        if (data.next || data.previous) {
            pagination = generatePaginationButtons (data.next, data.previous);
        }

        data = data.results;
        let tableHeaders = getTableHeaders(data[0]);    

        data.forEach(function(item) {
            let dataRow = [];

            Object.keys(item).forEach(function(key) {
                let rowData = item[key].toString();
                let truncatedData = rowData.substring(0,15);
                dataRow.push(`<td>${truncatedData}</td>`)
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });
        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`;
    })
}