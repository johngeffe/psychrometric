var expect = require('chai').expect;
var should = require('chai').should();
var assert = require('chai').assert;
var Psych = require('../index');

psych = Psych.psych;


describe('#psych', function() {
    it('get properties', function() {
        var options = {
            db: 50, // dry bulb temperature in °f (50 max)
            bp: 14.64052, // barametric pressure in psi
            rh: 50, // relative humidiy in %
            wind: 0, // wind speed in mph
            debug: true
        }
        var myProps = psych(options);
        var data = myProps.data;
        var other = data.other;
        var psychdata = data.psych;
        var humidiyRatio = data.humidiyRatio;
        var specificHeat = data.specificHeat;
        //   expect(other.windChill).to.be.greaterThan(30);
        expect(psychdata.dewPoint).to.be.greaterThan(30);
        //        expect(psych(options)).to.be.an('object');
    });
});