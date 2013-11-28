if (Meteor.isClient) {

	Template.login.events({

		'submit #login-form': function(e, t) {
			e.preventDefault();

			// retrieve the input field values
			var fogbugz = t.find('#fogbugz-url').value
					, email = t.find('#login-email').value
					, password = t.find('#login-password').value;

			// Trim and validate your fields here....

			// If validation passes, supply the appropriate fields to the
			// Meteor.loginWithPassword() function.
			Meteor.loginWithFogBugz({
						fogbugz: fogbugz,
						email: email,
						password: password
					},
					function(err) {
						if (err) {
							// The user might not have been found, or their passwword
							// could be incorrect. Inform the user that their
							// login attempt has failed.
							console.log('login failed');
						}
						else {
							// The user has been logged in.
							console.log('login ok');
						}
					});
			return false;
		}
	});
}

if (Meteor.isServer) {
	Meteor.startup(function() {
		// code to run on server at startup
	});
}
