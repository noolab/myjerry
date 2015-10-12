Meteor.methods({
	addToCart: function(userId,productid,shopid,qty){
		var ipAddress=this.connection.clientAddress;
		var attr={
			"ip_address":ipAddress,
			"user":userId,
			"product":productid,
			"shop":shopid,
			"quantity":qty
		};

		cart.insert(attr);
	}
});