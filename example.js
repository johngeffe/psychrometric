var psychrometric = require('altitude-pressure-converter');

var options = {
    db: 59.9, // dry bulb temperature in °f
    bp: 14.64052, // barametric pressure in psi
    rh: 50, // relative humidiy in %
    wind: 0 // wind speed in mph
}

var myAir = psychrometric(options);

console.log(myAir.data.psych.dewPoint);