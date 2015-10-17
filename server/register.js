Meteor.methods({
	regUser:function(firstname, lastname, email, password, shipcard, point, rerole){
			targetUserId = Accounts.createUser({
				email: email,
				password: password,
				profile:{firstname:firstname,lastname:lastname,shipcard:{shipcardId:shipcard,point:point}}
			});
			console.log(targetUserId);
			//Roles.setUserRoles(id, roleid, 'noolab')
			Roles.setUserRoles(targetUserId, [rerole], 'mygroup')
		}
});
