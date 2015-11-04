Meteor.startup(function() {
	Parameters.remove({});

	if (Parameters.find().count() === 0) {
		var parameters = [{
            date1: new Date('2011/01/03'),
            node: '171217',
			denominationAG: 'IL GRUPPO DIGITALE',
			address: 'via cassini 70',
			zip: '10129',
			city: 'TORINO',
			province: 'to',
            phone: '01119700708',
            fax: '01119700164',
            // email: '',
            // notes: '',
            website: 'wwww.ilgruppodigitale.it',
            companyActivity: '',
            // branches: '',
            // businessManager: '',
            // PECemail: '',
            // taxCode: '',
            // companiesRegistrationOffice: '',
            companiesRegistrationOfficeNumber: '00000000000',
            rea: '0000',
			shareCapital: '000000000',
			paidInCapital: '00000000',
			// bankDescription: '',
			// Num Conto Corrente
			// Codice
			IBAN: 'IT00000000000',
			// P IVA
			// Email Pec From
			// Email Pec To
			// User Email Pec From
			// Password Email Pec From
			// Host Email Pec From
			// Port Email Pec From
			// Utente Skebby
			// Password Skebby
			// Sms Acquistati Skebby
			// Sms Utilizzati Skebby
			// From Skebby
			activateEmail: 1,
			generatePdf: 1,
			generateDoc: 1,
			activateSkebbySMS: 1,
			// Attiva Email Pec
			// Abilitazione Pec
			// BIC
			// SWIFT
			activateLetterIndex: true,
			hideEmptyFields: true,
			// Denominazione AG2
			// Sede Legale
			Abilitazione: 'Collaboratori',
			reeinizializeCharge: false,
		}, ];

		parameters.forEach(function(parameter) {
			Parameters.insert(parameter);
		});

		console.log('added', Parameters.find().count(), 'parameters.');
	}
});
