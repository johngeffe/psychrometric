psychrometric
### Installation

npm i psychrometric --save

### Use as follows:

```javascript
include psychrometric from 'psychrometric'

var options= {
        db: 59.9,   // dry bulb temperature in °f
        bp: 14.64052, // barametric pressure in psi
        rh: 50, // relative humidiy in %
        wind: 0 // wind speed in mph
    }

var myAir = psychchrometric(options);

console.log(myAir.data.psych.dewPoint);

```

### Return a object with the following properties

```javascript
  myAir = {
        'data': {
            'psych': {
                'dryBulb',// dry bulb (°F)
                'wetBulb', // wetbulb (°F)
                'barometricPressure', // barametric pressure (psi)
                'relativeHumidity', // Relative humidity (%)
                'dewPoint', // dew point (°F)
                'volume', // Moist air specific volume (ft3 / lb da)
                'enthalpy' // enthalpy (Btu / lb da)
            },
            'humidityRatio': {
                'lbH2oPerLb', // (lb h2o / lb da)
                'grainsPerLb' // (gr h2o / lb da)
            },
            'other': {
                'molecularWeight', // Moleculare weight of moist air
                'specificHumidity', // Specific humidity
                'gasConstant', // gasconstant (ft-lbf / lb-°R)
                'entropyDryAir', // Entropy of dry air
                'entropyWaterVapor', // Entropy of water vapor
                'speedOfSound', // Speed of sound (ft /sec)
                'humidityRatioSaturatedAir', // Humidity ratio of saturated air
                'saturation', // degree of saturation (%)
                'density', // density (lb / ft3)
                'internalEnergy', // internal energy (Btu /lb)
                'enthalpySensibleHeat', // Sensibile enthalpy (Btu /lb)
                'enthalpyLatentHeat', // Latent enthalpy (Btu /lb)
                'virtualTemperature', // virtual temperature (°F)
                'windChill' // Wind chill (°F)
            },
            'specificHeat': { // (Btu / lb-°R)
                'isobaric', // Isobaric specific heat
                'isometric', // Isometric specific heat
                'heatRatio' // Specific heat ratio
            }
        }
    }
```
