if (Meteor.isClient) {

	Template.users.users = function(){
		var users = Meteor.users.find({}).fetch();
		return users.map(function(x) { return JSON.stringify(x, null, 2); });
	};

	Template.login.events({

		'click #login-button': function(e, t) {
			e.preventDefault();

			// retrieve the input field values
			var fogbugz = t.find('#fogbugz-url').value
					, email = t.find('#login-email').value
					, password = t.find('#login-password').value;

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
							alert('login failed: ' + err);
						}
					});
			return false;
		},

		'click #list-button': function(){
			Meteor.call('listUsers');
		}
	});

	Meteor.subscribe('users', function(){

	});
} else {
	Meteor.methods({
		 listUsers: function(){
			 var users = Meteor.users.find({}).fetch();
			 users.forEach(function(u){
				  console.log(JSON.stringify(u, null, 2));
			 });
		 }
	});
}
