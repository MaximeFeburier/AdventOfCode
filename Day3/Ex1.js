const fs = require('fs');

fs.readFile('input.txt', (err, inputD) => {

    String.prototype.replaceAt = function(index, replacement) {
        return this.substring(0, index) + replacement + this.substring(index + replacement.length);
    }

    //regex is numeric or point or space
    const regex = /^[\d. ]+$/;

    //verify if char is numeric or point or space
    const isSymbol = (char) => {
        return !char.match(regex);
    }

    //numeric regex
    const numericRegex = /^[\d]+$/;

    //verify if char is numeric
    const isNumeric = (char) => {
        return char && !!char.match(numericRegex);
    }


    //return all cells arround a specify cell
    const allCellsArround = (i,j) => [
            [i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
            [i, j - 1], [i, j + 1],
            [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]
        ];


    //return all cells arround a specify cell with a symbol
    const checkCellsArround = (i,j) => {
        let indexOfNumber = [];
        allCellsArround(i,j).forEach(cell => {
            if(isSymbolArround(cell[0], cell[1])){
                indexOfNumber.push(cell);
            }
        });
        return indexOfNumber;
    }

    //verify if cell is a symbol
    const isSymbolArround = (i, j) => {
        if(i < 0 || j < 0 || i >= lines.length || j >= lines[i].length){
            return false;
        }else{
            return isSymbol(lines[i][j]);
        }
    }

    //get number and replace used cells by a point to don't use again
    const getNumberAndReplaceUsed = (j,line) => {
        let numberAfter = '';
        let numberBefore = '';
        let index = 1;
        while(j+index < line.length && isNumeric(line[j + index])){
            numberAfter = numberAfter+line[j + index];
            line[j + index] = '.';
            index++;
        }
        let index2 = 0;
        while((j+index2) >= 0 && isNumeric(line[j - index2])){
            numberBefore =line[j - index2]+ numberBefore  ;
            line[j - index2] = '.';
            index2++;
        }
        return +numberBefore.concat(numberAfter);
    }

    if (err) throw err;

    const lines = inputD.toString().split('\r\n');
    const result = [];
    for(let i = 0; i < lines.length; i++){
        const currentLine = lines[i].split('');

        for(let j = 0; j < currentLine.length; j++){
            if(isNumeric(lines[i][j])){
                const symbolIndex = checkCellsArround(i,j);
                if(symbolIndex.length > 0){
                    const number = getNumberAndReplaceUsed(j, currentLine);
                    result.push(number);
                }
            }
        }
    }
    console.log(result.reduce((a,b) => a+b));
});


