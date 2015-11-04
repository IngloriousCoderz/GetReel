Meteor.startup(function() {
	Parameters.remove({});

	if (Parameters.find().count() === 0) {
		var parameters = [{
            date1: new Date('2011/01/03'),
            node: '171217'
			denominationAG: 'IL GRUPPO DIGITALE',
			address: 'via cassini 70',
			zip: '10129',
			city: 'TORINO',
			province: 'to',
            phone: '01119700708',
            fax: '01119700164',
            email: '',
            notes: '',
            website: 'wwww.ilgruppodigitale.it',
            companyActivity: '',
            branches: '',
            businessManager: '',
            PECemail: '',
            taxCode: '',
            companiesRegistrationOffice: '',
            companiesRegistrationOfficeNumber: '',
            rea: '',

		}, ];

		parameters.forEach(function(parameter) {
			Parameters.insert(parameter);
		});

		console.log('added', Parameters.find().count(), 'parameters.');
	}
});