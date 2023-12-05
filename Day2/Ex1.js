const fs = require('fs');

const redNumber = 12;
const blueNumber = 14;
const greenNumber = 13;

fs.readFile('input.txt', (err, inputD) => {
    if (err) throw err;

    const lines = inputD.toString().replace(/,/g, ';').split('\r\n');
    const games = [];

    lines.forEach(line => {
        const gameNumber = +(line.split(':')[0]).split(' ')[1];
        let  [red, blue, green] = [0, 0, 0];
        const values = line.split(':')[1].split(';').filter(x => x !== '');

        values.forEach(value => {
           const [number,color] = value.trim().split(' ');
              if (color === 'red') {
                  red += parseInt(number);
              }else if (color === 'blue') {
                  blue += parseInt(number);
              }else if (color === 'green') {
                  green += parseInt(number);
              }
        });
        console.log(`red = ${red} blue = ${blue} green = ${green} line = ${line}  gameNumber = ${gameNumber}`);
        if(red <= redNumber && blue <= blueNumber && green <= greenNumber){
            console.log('✔');
            games.push(gameNumber);
        }
    });
    console.log(games.reduce((elt, acc) => elt + acc));
})

