// register 
Template.register.events({
    'click #btnRegister': function(e, tpl){
		e.preventDefault();
		//alert("register"); 
		var firstname =$('#firstname').val();
		var lastname =$('#lastname').val();
		var email = $('#email').val();
		var password =$('#password').val();
		var rerole = 'member';
		Meteor.call('registerUser',firstname, lastname, email, password, rerole);
			alert("Success Register!");
            Router.go('login');  
    }		
});