Session.set("loginError","");
Session.set("registerError","");
Template.login.helpers({
	loginError:function(){
		var msg = Session.get("loginError");
		if( msg ) return true;
		else return false;
	},
	loginErrormsg: function(){
		return Session.get("loginError");
	},
	registerError:function(){
		var msg = Session.get("registerError");
		if( msg ) return true;
		else return false;
	},
	registerErrormsg: function(){
		return Session.get("registerError");
	}
})
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
				Session.set("loginError",error.reason);
			} else {
				 Session.set("loginError","");
				 var loggedInUser = Meteor.user();
				 var group = 'mygroup';
				 if (Roles.userIsInRole(loggedInUser, ['admin'], group)) {
					Router.go('/admin');
					$('.close').click();
				 }
				 else if (Roles.userIsInRole(loggedInUser, ['member'], group)) {	

						Router.go('/profile');
						$('.close').click();
				 }
				 else{

					 Router.go('/profile');
					 $('.close').click();
				 }
			}
		});
    },
     'click #poplogin': function(event){
    	//alert("jjss");
    	$("#squarespaceModal").modal({                    
			"backdrop"  : "static",
			"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		  });
    },
    'click #btnReg': function(event){
    	event.preventDefault();
    	var firstname =$('#txtfirstname').val();
		var lastname =$('#txtlastname').val();
		var email = $('#txtemail').val();
		var password =$('#txtpassword').val();
		var shipcard = '';
		var point = '0';
		var rerole = 'member';
		var msg = '';
		if( firstname == '' || lastname == ''){
			if( firstname == '' )
				msg += 'Firt Name is required.<br>';
			if( lastname == '' )
				msg += 'Last Name is required.';
			
			Session.set("registerError", msg );
		}
		else{
			//alert(firstname+lastname+email+password);
			Meteor.call('regUser',firstname, lastname, email, password, shipcard, point, rerole,function(err){
				if(err){
					console.log(err.reason);
					Session.set("registerError",err.reason);
				}else{
					Session.set("registerError","");
					Router.go('register-success'); 
				}
			});
		}
    	
    }
});


Template.login.onRendered(function(){
	$("#squarespaceModal").modal({                    
			"backdrop"  : "static",
			"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		  });
	$('#squarespaceModal').on('hidden.bs.modal', function () {
		Router.go('/');
	})
});
Template.registerSuccess.onRendered(function(){
	$("#squarespaceModal").modal({                    
			"backdrop"  : "static",
			"keyboard"  : true,
			"show"      : true   // show the modal immediately                  
		  });
	$('#squarespaceModal').on('hidden.bs.modal', function () {
		$('.modal-backdrop').remove();
		Router.go('/');
	})
});
