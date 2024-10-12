function getMatrix(name, n, m) {
    let matrix = [];

    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < m; j++) {
            matrix[i][j] = parseFloat(document.getElementById(`matrix${name}_${i}_${j}`).value) || 0;
        }
    }
    return matrix;
}

function generateMatrix(tableId, rows, cols) {

    let table = document.getElementById(tableId);
    
    if(tableId == 'matrixA')
        table.innerHTML = '<caption>Matrix A</caption>';  
    else if(tableId == 'matrixB')
        table.innerHTML = '<caption>Matrix B</caption>'; 
    else
        table.innerHTML = '<caption>Matrix</caption>';

    for (let i = 0; i < rows; i++) {
        let row = table.insertRow();
        for (let j = 0; j < cols; j++) {
            let cell = row.insertCell();
            let input = document.createElement('input');
            input.type = 'number';
            input.placeholder = '0';
            input.id = `${tableId}_${i}_${j}`;
            cell.appendChild(input);
        }
    }
}

function calculateRank(matrix) {
    let m = matrix.length;
    let n = matrix[0].length;

    // make a copy
    let mat = JSON.parse(JSON.stringify(matrix));

 
    let row = 0;
    for (let col = 0; col < n; col++) {
        if (row >= m) break;
        

        let pivotRow = row;
        while (pivotRow < m && mat[pivotRow][col] === 0) {
            pivotRow++;
        }

        if (pivotRow === m) continue;

        if (pivotRow !== row) {
            let temp = mat[row];
            mat[row] = mat[pivotRow];
            mat[pivotRow] = temp;
        }


        for (let r = row + 1; r < m; r++) {
            let factor = mat[r][col] / mat[row][col];
            for (let j = col; j < n; j++) {
                mat[r][j] -= factor * mat[row][j];
            }
        }
        
        row++; 
    }
    
    let nonZeroRows = 0;
    for (let r = 0; r < m; r++) {
        if (mat[r].some(value => Math.abs(value) > 1e-10)) {
            nonZeroRows++;
        }
    }

    return nonZeroRows;
}

function squareMatrixDisplayResult(result) {
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<hr><h2>Result:</h2>";

    if (typeof result === 'number') {
        resultDiv.innerHTML += `<table><tr><th>${result}</tr></th></table>`;
    } else if (Array.isArray(result)) {
        let table = document.createElement('table');

        result.forEach(row => {
            let tr = document.createElement('tr');
            row.forEach(cellValue => {
                let td = document.createElement('td');
                td.textContent = cellValue;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        resultDiv.appendChild(table);
    } else {
        resultDiv.innerHTML += `<table><tr><th>${result}</tr></th></table>`;
    }
}


function multiMatrixDisplayResult(resultMatrix) {
    let resultDiv = document.getElementById("result");
    let tableHTML = "<h2>Result:</h2><table>";

    resultMatrix.forEach(row => {
        tableHTML += "<tr>";
        row.forEach(cell => {
            tableHTML += `<td>${cell}</td>`; 
        });
        tableHTML += "</tr>"; 
    });

    tableHTML += "</table>"; 
    resultDiv.innerHTML = tableHTML;
}