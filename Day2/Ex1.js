const fs = require('fs');

fs.readFile('input.txt', (err, inputD) => {
    if (err) throw err;

    const lines = inputD.toString().split('\r\n');
    const games = [];

    lines.forEach(line => {
        let isKo = false;

        // Get game number
        const gameNumber = +(line.split(':')[0]).split(' ')[1];

        //Get bags as array
        const bags = line.split(':')[1].split(';');

        bags.forEach(bag => {
            let  [red, blue, green] = [0, 0, 0];

            // Get bag as array
            bag = bag.trim().split(',');

            bag.forEach(elt => {
                //clean data
                elt = elt.trim();

                const [number, color] = elt.split(' ');

                if (color === 'red') {
                    red += parseInt(number);
                }else if (color === 'blue') {
                    blue += parseInt(number);
                }else if (color === 'green') {
                    green += parseInt(number);
                }
            });

            if(red > redNumber || blue > blueNumber || green > greenNumber) {
                isKo = true;
            }

        });

        if(!isKo){
            games.push(gameNumber);
        }

    });

    console.log(games.reduce((a, b) => a + b));
})

