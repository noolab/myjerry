Meteor.methods({
	addToCart: function(userId,productid,shopid,qty){//DEPRECATED
		var ipAddress=this.connection.clientAddress;
		var attr={
			"ip_address":ipAddress,
			"user":userId,
			"product":productid,
			"shop":shopid,
			"quantity":qty
		};

		cart.insert(attr);
	},

	addtocart: function(obj){
		var ipAddress=this.connection.clientAddress;
		console.log("IP ADDRESS:"+ipAddress);
		obj.ip_address=ipAddress;


		cart.insert(obj);
	}
});