psychrometric

### Use as follows:

```javascript

var option= {
        db: 59.9,   // dry bulb temperature in °f
        bp: 14.64052, // barametric pressure in psi
        rh: 50, // relative humidiy in %
        wind: 0 // wind speed in mph
    }

var myair = psych(options);

```

### Return a object with the following properties

```javascript
    data = {
        data: {
            psych: {
                'db': db, // dry bulb (°F)
                'wb': wb, // wetbulb (°F)
                'bp': bp, // barametric pressure (psi)
                'rh': rh, // Relative humidity (%)
                'dp': dp, // dew point (°F)
                'vol': vol, // Moist air specific volume (ft3 / lb da)
                'enthalpy': enthalpy, // enthalpy (Btu / lb da)
                humidityRatio: {
                    'w': w, // (lb h2o / lb da)
                    'w2': (w * 70000) / 10 // (gr h2o / lb da)
                },
            },
            other: {
                'mw': mw, // Moleculare weight of moist air
                'sph': sph, // Specific humidity
                'gasconstant': gasconstant, // gasconstant (ft-lbf / lb-°R)
                'entropyair': entropyair, // Entropy of dry air
                'entropyvapor': entropyvapor, // Entropy of water vapor
                'speed': speed, // Speed of sound (ft /sec)
                'ws': ws, // Humidity ratio of saturated air
                'saturation': saturation, // degree of saturation
                'density': density, // density (lb / ft3)
                'u': u, // internal energy (Btu /lb)
                'enthalpys': enthalpys, // Sensibile enthalpy (Btu /lb)
                'enthalpyl': enthalpyl, // Latent enthalpy (Btu /lb)
                'HI': HI, // heat index 
                'tv': tv, // virtual temperature (°F)
                'windchill': chill, // Wind chill (°F)
                specificHeat: { // (Btu / lb-°R)
                    'cp': cp, // Isobaric specific heat
                    'cv': cv, // Isometric specific heat
                    'k': k, // Specific heat ratio
                }
            }
        }
    }
```
