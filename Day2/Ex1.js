const fs = require('fs');

const redNumber = 12;
const blueNumber = 14;
const greenNumber = 13;

fs.readFile('input.txt', (err, inputD) => {
    if (err) throw err;

    const lines = inputD.toString().split('\r\n');
    const games = [];

    lines.forEach(line => {
        let isKo = false;
        const gameNumber = +(line.split(':')[0]).split(' ')[1];
        const values = line.split(':')[1].split(';');

        values.forEach(value => {
            let  [red, blue, green] = [0, 0, 0];
            value = value.replace(/,/g, '');
            const [number,color] = value.trim().split(' ');

            if (color === 'red') {
                red += parseInt(number);
            }else if (color === 'blue') {
                blue += parseInt(number);
            }else if (color === 'green') {
                green += parseInt(number);
            }

            if(red > redNumber || blue > blueNumber || green > greenNumber){
                isKo = true;
            }
        });
        if(!isKo){
            games.push(gameNumber);
        }
    });
    console.log(games);
})

