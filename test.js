
> psychrometric@0.0.1 test C:\Users\John\git\psychrometric
> mocha --reporter list


    #psych get properties: { db: 40, bp: 14.64052, rh: 50, wind: 10 }
{ data: 
   { psych: 
      { dryBulb: 40,
        wetBulb: 33.578,
        barometricPressure: 14.64052,
        relativeHumidity: 50,
        dewPoint: 23.939137773651105,
        volume: 12.69719419137308,
        enthalpy: 12.400903714818469 },
     humidityRatio: { w1: 0.0025962660266017224, w2: 18.173862186212055 },
     other: 
      { molecularWeight: 28.92047696572734,
        specificHumidity: 0.0025895428843865616,
        gasConstant: 53.434416100098886,
        entropyDryAir: 0.02000142875162478,
        entropyWaterVapor: 2.2927832161115584,
        speedOfSound: 1096.445809614896,
        humidityRationSaturatedAir: 0.0052142987798023425,
        saturation: 0.4979127848711689,
        density: 0.07896203294329394,
        internalEnergy: -21.90986257468473,
        enthalpySensibleHeat: 9.588522974653182,
        enthalpyLatentHeat: 2.8123807401652865,
        heatIndex: 25,
        virtualTemperature: 40.78874395727138,
        windChill: 33.64254827558847 },
     specificHeat: 
      { isobaric: 0.24056080869755736,
        isometric: 0.1718939559957678,
        heatRatio: 1.3994721763427227 },
     key: 
      { lb: 'pound mass of moist air',
        'lb da': 'pound mass of dry air',
        lbf: 'pound force',
        psia: 'pound force per square inch absolute',
        cf: 'cubic foot of moist air',
        gr: 'grain (7000 grains = 1 pound mass)',
        oR: 'absolute temperature (degrees Rankine)' } } }
  . #psych get properties: 37ms

  1 passing (51ms)

