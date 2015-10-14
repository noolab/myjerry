Template.login.events({
    'submit form': function(event,tpl){
        event.preventDefault();
		//alert("login");
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
		/*$('.close').click();*/
		Meteor.loginWithPassword(email, password, function(error){
			if(error){
				console.log(error.reason);
			} else {
				 var loggedInUser = Meteor.user();
				 var group = 'mygroup';
				 if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
					Router.go('/admin');
					$('.close').click();
				 }
				 else if (Roles.userIsInRole(loggedInUser, ['member'], group)) {	

						Router.go('/contenmember');
						$('.close').click();
				 }
				 else{

					 Router.go('/contenmember');
					 $('.close').click();
				 }
			}
		});
    }
});
Template.login.events({
    'click #poplogin': function(event){
    	//alert("jjss");
    	$("#squarespaceModal").modal({                    
			"backdrop"  : "static",
			"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		  });
    }
});


// For Register Popoup

Template.login.events({
    'click #btnReg': function(event){
    	event.preventDefault();
    	var firstname =$('#txtfirstname').val();
		var lastname =$('#txtlastname').val();
		var email = $('#txtemail').val();
		var password =$('#txtpassword').val();
		var rerole = 'member';
    	//alert(firstname+lastname+email+password);
    	Meteor.call('regUser',firstname, lastname, email, password, rerole,function(err){
    		if(err){
    			console.log(err.reason);
    		}else{
    			alert("you have succesfully register");
    		}
    	});
    }
});