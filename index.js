'use strict';

var c1 = -10214.165; //constants for vapor pressure over water/ice per
var c2 = -4.8932428; //ASHRAE HOF 2009 and ANSI/ASHRAE 41.6-1994
var c3 = -0.0053765794; //Constants checked against HOF 2009.....OK
var c4 = 0.00000019202377;
var c5 = 0.00000000035575832;
var c6 = -0.000000000000090344688;
var c7 = 4.1635019;
var c8 = -10440.397;
var c9 = -11.294650;
var c10 = -0.027022355;
var c11 = 0.000012890360;
var c12 = -0.0000000024780681;
var c13 = 6.5459673;

var c14 = 100.45; //constants to determine dew point
var c15 = 33.193;
var c16 = 2.319;
var c17 = 0.17074;
var c18 = 1.2063;

var hg; //define variables
var elev; // elevation
var psia; // PSI abosulte
var wb; // Wet Bulb
var td; //Dewpoint
var rh; // Relative Humidity
var pws;
var dp; // Dew Point
var wstar;
var wsstar;
var pwsstar;
var x; //dummy variable
var wind;

// t = temp °F
function ppw(t) //calc saturation pressure over water equal or above 32 deg
{
    x = (459.67 + t * 1);
    var pws = Math.exp(c8 / x + c9 + c10 * x + c11 * Math.pow(x, 2) + c12 * Math.pow(x, 3) + c13 * Math.log(x));
    return pws;
}

function ppww(t) //calc saturation pressure over ice equal or less than 32 deg
{
    x = (459.67 + t * 1);
    var pws = Math.exp(c1 / x + c2 + c3 * x + c4 * Math.pow(x, 2) + c5 * Math.pow(x, 3) + c6 * Math.pow(x, 4) + c7 * Math.log(x));
    return pws;
}

function wws(p, pw) //calc humidity ratio based on barometric pressure and partial pressure of water
{
    var ws = 0.621945 * pw / (p - pw);
    return ws;
}

function wwb(dba, wba, wsw) //calc humidity ratio based on wb db and ws
{
    var w = ((1093 - 0.556 * wba) * wsw - 0.240 * (dba - wba)) / (1093 + 0.444 * dba - wba);
    return w;
}

function wetbulb(guess, db, p) //Calculate wet bulb iteration parameters
{
    var pwsstar = ppw(guess);
    var wsstar = wws(p, pwsstar);
    var wstar = wwb(db, guess, wsstar);
    return wstar;
}

function prh(sat, pws, p) //calc percent rh
{
    var rh = sat / (1 - (1 - sat) * (pws / p));
    return rh;
}

function h(db, w) //calc enthalpy
{
    var enthalpy = 0.240 * db + w * (1061.06 + 0.444 * db);
    return enthalpy;
}

function dew(pw, rh, db, wb) //calc dew point
{
    var a = Math.log(pw);
    var td = c14 + c15 * a + c16 * Math.pow(a, 2) + c17 * Math.pow(a, 3) + c18 * Math.pow(pw, 0.1984);
    if (td < 32) { td = 90.12 + 26.142 * a + 0.8927 * Math.pow(a, 2); }
    if (rh == 100) {
        td = db;
    }
    if (db == wb) {
        td = db;
    }
    if (rh == 0) {
        td = -459.67;
    }
    return td;
} //end dew point calculation

function cpa(db) //specific heat of dry air (Shapiro 2ed)
{
    var t = db * 1 + 459.67;
    var a = 3.653;
    var b = -0.7428e-3;
    var c = 1.017e-6;
    var d = -0.328e-9;
    var e = 0.02632e-12;
    var cpair = (a * 1 + b * t + c * Math.pow(t, 2) + d * Math.pow(t, 3) + e * Math.pow(t, 4)) * 53.350 / 778.169;
    return cpair;
}

function cpw(db) //specific heat of water vapor  (Shapiro 2ed)
{
    var t = db * 1 + 459.67;
    var a = 4.070;
    var b = -0.616e-3;
    var c = 1.281e-6;
    var d = -0.508e-9;
    var e = 0.0769e-12;
    var cpvapor = (a * 1 + b * t + c * Math.pow(t, 2) + d * Math.pow(t, 3) + e * Math.pow(t, 4)) * 85.80344253 / 778.169;
    return cpvapor;
}

module.exports.psych = function(options) {

    var db;
    var bp; // barometric pressure in psia

    var pws; //Declare variables
    var wss;
    var w;
    var pwd;
    var ws;
    var saturation;
    var vol;
    var density;
    var enthalpy;
    var enthalpys;
    var enthalpyl;
    var u; //internal energy
    var pw;
    var sph;
    var cp;
    var cv;
    var k;
    var speed; //speed of sound in air sample
    var chill; //windchill
    var wind; // wind speed in mph
    var HI; //Heat Index
    var mw; //molecular weight
    var molefractionwater;
    var gasconstant;
    var entropyair;
    var entropyvapor;
    var entropy;
    var tv; //Virtual Temperature

    options = (options == null) ? {
        db: 59.9,
        bp: 14.64052,
        rh: 50,
        wind: 0
    } : options;
    console.log(options);
    // calculate barometricPressure
    db = options.db; // dryBulb temperature in deg f
    bp = options.bp; // barometric pressure in psia
    rh = Math.min(1, Math.max(0, options.rh / 100)); // relative humidity in % (0-100 converted to 0.0 to 1.0)
    wind = options.wind; //wind speed in mph
    pwd = (db < 32) ? ppww(db) : ppw(db);
    pw = pwd * rh;
    w = wws(bp, pw);
    sph = w / (1 + w);
    molefractionwater = w / (w + 0.621945);
    mw = molefractionwater * 18.015268 + (1 - molefractionwater) * 28.966;
    gasconstant = 1545.3488 / mw;
    cp = cpa(db) * (1 - molefractionwater) + cpw(db) * molefractionwater;
    cv = cp - gasconstant / 778.169;
    k = cp / cv;
    entropyair = cpa(db) * Math.log((db * 1 + 459.67) / 459.67);
    entropyvapor = 2.3298 - cpw(db) * Math.log((db * 1 + 459.67) / 459.67);
    entropy = entropyair + entropyvapor * w;
    speed = Math.sqrt(k * gasconstant * (db * 1 + 459.67) * 32.17405);
    ws = wws(bp, pwd);
    saturation = w / ws;
    rh = prh(saturation, pwd, bp);
    vol = 53.350 * (db * 1 + 459.67) * (1 + 1.60776874 * w) / (bp * 144);
    density = (1 / vol) * (1 + w);
    enthalpy = h(db, w);
    u = enthalpy - gasconstant * (db * 1 + 459.67) / 778.169;
    enthalpys = db * cpa(db);
    enthalpyl = enthalpy - enthalpys;
    dp = dew(pw, rh, db, wb);
    // get wet bulb
    var step = 10;
    var guess = db - step;
    wstar = wetbulb(guess, db, bp);
    while (Math.abs(wstar - w) > 0.000001) {
        if ((wstar - w) < 0) {
            guess = guess + step * 1;
            step = step / 10;
            guess = guess - step;
            wstar = wetbulb(guess, db, bp);
        } else {
            guess = guess - step;
            wstar = wetbulb(guess, db, bp);
        }
    }
    wb = (db == dp) ? db : guess;
    // end get web bulb
    HI = 16.923 + 0.185212 * db + 5.37941 * rh - 0.100254 * db * rh + 0.00941695 * db ^ 2 + 0.00728898 * rh ^ 2 + 0.000345372 * db ^ 2 * rh - 0.000814971 * db * rh ^ 2 + 0.0000102102 * db ^ 2 * rh ^ 2 - 0.000038646 * db ^ 3 + 0.0000291583 * rh ^ 3 + 0.00000142721 * db ^ 3 * rh + 0.000000197483 * db * rh ^ 3 - 0.0000000218429 * db ^ 3 * rh ^ 2 + 0.000000000843296 * db ^ 2 + rh ^ 3 - 0.0000000000481975 * db ^ 3 * rh ^ 3;
    tv = (1 + 0.608 * w) * (db * 1 + 459.67) - 459.67;
    chill = (db > 50) ? null : (35.74 + 0.6215 * db - 35.75 * Math.pow(wind, 0.16) + 0.4275 * db * Math.pow(wind, 0.16));

    var data = {};
    data = {
        'data': {
            'psych': {
                'dryBulb': Math.round(db * 100) / 100, // dry bulb (°F)
                'wetBulb': Math.round(wb * 100) / 100, // wetbulb (°F)
                'barometricPressure': Math.round(bp * 100000) / 100000, // barametric pressure (psi)
                'relativeHumidity': rh * 100, // Relative humidity (%)
                'dewPoint': Math.round(dp * 10) / 10, // dew point (°F)
                'volume': Math.round(vol * 100) / 100, // Moist air specific volume (ft3 / lb da)
                'enthalpy': Math.round(enthalpy * 100) / 100 // enthalpy (Btu / lb da)
            },
            'humidityRatio': {
                'lbH2oPerLb': Math.round(w * 100000) / 100000, // (lb h2o / lb da)
                'grainsPerLb': Math.round(w * 70000) / 10 // (gr h2o / lb da)
            },
            'other': {
                'molecularWeight': Math.round(mw * 10000) / 10000, // Moleculare weight of moist air
                'specificHumidity': Math.round(sph * 100000) / 100000, // Specific humidity
                'gasConstant': Math.round(gasconstant * 100) / 100, // gasconstant (ft-lbf / lb-°R)
                'entropyDryAir': Math.round(entropyair * 10000) / 10000, // Entropy of dry air
                'entropyWaterVapor': Math.round(entropyvapor * 10000) / 100000, // Entropy of water vapor
                'speedOfSound': Math.round(speed), // Speed of sound (ft /sec)
                'humidityRatioSaturatedAir': Math.round(ws * 1000) / 10, // Humidity ratio of saturated air
                'saturation': Math.round(saturation * 1000) / 10, // degree of saturation (%)
                'density': Math.round(density * 1000000) / 1000000, // density (lb / ft3)
                'internalEnergy': Math.round(u * 100) / 100, // internal energy (Btu /lb)
                'enthalpySensibleHeat': Math.round(enthalpys * 100) / 100, // Sensibile enthalpy (Btu /lb)
                'enthalpyLatentHeat': Math.round(enthalpyl * 100) / 100, // Latent enthalpy (Btu /lb)
                'virtualTemperature': Math.round(tv * 100) / 100, // virtual temperature (°F)
                'windChill': Math.round(chill * 100) / 100 // Wind chill (°F)
            },
            'specificHeat': { // (Btu / lb-°R)
                'isobaric': Math.round(cp * 1000) / 1000, // Isobaric specific heat
                'isometric': Math.round(cv * 1000) / 1000, // Isometric specific heat
                'heatRatio': Math.round(k * 1000) / 1000 // Specific heat ratio
            }
        }
    };

    if (options.debug) console.log(data);
    return data;
}