Meteor.startup(function() {
	Locations.remove({});
	if (Locations.find().count() === 0) {
		var locations = [
            {
			     name: 'EURES PADOVA',
                 address: 'PIAZZA BARDELLA',
                 streetNumber: '12',
                 city: 'PADOVA',
                 province: 'PD',
		    },
            {
			     name: 'SCUOLA BAUER',
                 address: 'VIA',
                 city: 'MILANO',
                 province: 'MI',
		    },
            {
			     name: 'TORINO',
                 address: 'VIA CASSINI',
                 streetNumber: '70',
                 city: 'TORINO',
                 province: 'TO',
                 zip: '10100',
		    },
            {
			     name: 'CINECITTA\'',
                 address: '....',
                 city: 'ROMA',
                 province: 'RM',
		    },
            {
			     name: 'HOTEL GIOBERTI',
                 address: '....',
                 city: 'ROMA',
                 province: 'RM',
		    },
            {
			     name: 'SELEZIONE ESTATE',
                 address: 'VIA CASSINI',
                 streetNumber: '70',
                 city: 'TORINO',
                 province: 'TO',
                 zip: '10100',
		    },
            {
			     name: 'CATANIA',
                 address: 'SEDE EURES',
                 city: 'CATANIA',
                 province: 'CT',
		    },
            {
			     name: 'BARI',
                 address: 'FIERA',
                 city: 'BARI',
                 province: 'BA',
		    },
            {
			     name: 'LAMEZIA TERME',
                 address: 'SEDE',
                 city: 'LAMEZIA TERME',
                 province: 'CZ',
		    },
            {
			     name: 'FIRENZE',
                 address: 'EURES',
                 city: 'FIRENZE',
                 province: 'FI',
		    },
            {
			     name: 'BOLOGNA',
                 address: 'EURES',
                 city: 'BOLOGNA',
                 province: 'BO',
		    },
            {
			     name: 'CAMPANIA',
                 address: 'SEDE',
                 city: 'SALERNO',
                 province: 'SA',
		    },
            {
			     name: 'CAGLIARI',
                 address: 'hhhh',
                 streetNumber: '7777',
                 city: 'FDFF',
                 province: 'AP',
                 zip: '7777',
		    },
            {
			     name: 'PALERMO',
                 address: 'EURES',
                 city: 'PALERMO',
                 province: 'PA',
		    },
        ];
		locations.forEach(function(location) {
			Locations.insert(location);
		});
		console.log("added ", Locations.find().count(), "locations.");
	}
});