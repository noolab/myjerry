
Session.set('shopselected','');
Template.cart.helpers({
	shopsavailable: function(productid){
		console.log("productid:"+productid);
		return shops.find({"products.product":productid});
	},
	getQuantity: function(productid,shopid){
		console.log('getting quantity of'+productid+" from "+shopid);
		if(shopid=='' || shopid==null)
			return 0;
		var currentShop=shops.find({"_id":shopid,"products.product":productid},{"products.$.quantity":1});//
		var result=currentShop.fetch();
		if(result.length==0)
			return 0;
		else
			return result[0].products[0].quantity;
	},
	shopSelected: function(){
		return Session.get('shopselected');
	}
	
});

Template.cart.events({
	'change select': function(e,tpl){
		var shop=tpl.$('#shop').val();
		shop=shop.replace("ObjectID(\"","");
		shop=shop.replace("\")","");
		Session.set('shopselected',shop);

		//console.log('heho');
		console.log("shop selected:"+shop);
	},
	'click #addtocart': function(e,tpl){
		var maxQty=tpl.$("#max").text();
		var qty=tpl.$("#qty").val();

		if(Number(qty)>Number(maxQty)){
			alert("Cannot order more than "+maxQty+" items!");
			return;
		}

		var userId=Meteor.user()._id;
		//var ipAddress=this.request.connection.remoteAddress;
		var productid=this._id;
		var shopid=tpl.$("#shop").val();
		//console.log("ipAdresse"+ipAddress);
		Meteor.call("addToCart",userId,productid,shopid,qty);
	}
});