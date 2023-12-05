const fs = require('fs');

fs.readFile('input.txt', (err, inputD) => {
    if (err) throw err;

    const lines = inputD.toString().split('\r\n');

    const getMinGamesValues = (lines) => {
        const returnValues = [];
        lines.forEach(line => {
            const gameNumber = +(line.split(':')[0]).split(' ')[1];
            if(gameNumber !== undefined) {
                const allInOneLine = line.split(':')[1].replace(/;/g, ',').split(',');
                let [red, blue, green] = [0, 0, 0];
                allInOneLine.forEach(elt => {
                    elt = elt.trim().split(' ');
                    const [number, color] = elt;
                    if (color === 'red' && number > red) {
                        red = parseInt(number);
                    } else if (color === 'blue' && number > blue) {
                        blue = parseInt(number);
                    } else if (color === 'green' && number > green) {
                        green = parseInt(number);
                    }
                });
                returnValues.push(red * blue * green);
            }
        });
        console.log(returnValues.reduce((a, b) => a + b));
    }
    getMinGamesValues(lines);
});

