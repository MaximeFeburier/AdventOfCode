const fs = require('fs');

fs.readFile('input.txt', (err, inputD) => {

    //regex is only *
    const regex = /^[\*]+$/;

    //verify if char is *
    const isSymbol = (char) => {
        return char.match(regex);
    }

    //numeric regex
    const numericRegex = /^[\d]+$/;

    //verify if char is numeric
    const isNumeric = (char) => {
        return char && !!char.match(numericRegex);
    }

    //return all cells around specify cell
    const allCellsAround = (i, j) => [
        [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
        [i, j - 1], [i, j + 1],
        [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
    ];

    const containInPassedIndex = (i, j, passedIndex) => {
        return passedIndex.some(idxs => {
            return idxs[0] <= j && idxs[1] >= j && idxs[2] === i;
        });
    }

    const checkCellsAroundForNumber = (i, j) => {
        let indexOfNumber = [];
        let passedIndex = [];
        allCellsAround(i, j).forEach(cell => {
            if (isNumericCell(cell[0], cell[1]) && !containInPassedIndex(cell[0], cell[1], passedIndex)) {
                indexOfNumber.push(getNumberAndReplaceUsed(cell[1], cell[0], passedIndex));
            }
        });
        return indexOfNumber;
    }

    const isNumericCell = (i, j) => {
        if (i < 0 || j < 0 || i >= lines.length || j >= lines[i].length) {
            return false;
        } else {
            return isNumeric(lines[i][j]);
        }
    }

    //get number and replace used cells by a point to don't use again
    const getNumberAndReplaceUsed = (j, i, indexPassed) => {
        const line = lines[i].split('');
        let numberAfter = '';
        let numberBefore = '';
        let index = 1;
        while (j + index < line.length && isNumeric(line[j + index])) {
            numberAfter = numberAfter + line[j + index];
            line[i][j + index] = '.';
            index++;
        }
        let index2 = 0;
        while ((j - index2) >= 0 && isNumeric(line[j - index2])) {
            numberBefore = line[j - index2] + numberBefore;
            line[i][j - index2] = '.';
            index2++;
        }
        indexPassed.push([j - index2, j + index, i]);
        return +numberBefore.concat(numberAfter);
    }


    if (err) throw err;

    let lines = inputD.toString().split('\r\n');
    const result = [];
    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i].split('');

        for (let j = 0; j < currentLine.length; j++) {
            if (isSymbol(lines[i][j])) {
                const symbolIndex = checkCellsAroundForNumber(i, j);
                if (symbolIndex.length === 2) {
                    result.push(symbolIndex.reduce((a, b) => a * b));
                }
            }
        }
    }
    console.log(result.reduce((a, b) => a + b));
});