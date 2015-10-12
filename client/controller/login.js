Template.login.events({
    'submit form': function(event){
        event.preventDefault();
		//alert("login");
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				console.log(error.reason);
			} else {
				 var loggedInUser = Meteor.user();
				 var group = 'noolab';
				 if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
					Router.go('/admin');
				 }
				 else if (Roles.userIsInRole(loggedInUser, ['manager'], group)) {
					Router.go('/contenmember');
				 }
				 else{
					 Router.go('/contenmember');
				 }
			}
		});
    }
});