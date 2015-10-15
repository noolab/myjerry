
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


Template.cartview.helpers({
	getNameproduct: function(id_product){
		return products.findOne({"_id":id_product}).title;
	},
	getPriceproduct: function(id_product){
		return products.findOne({"_id":id_product}).price;
	},
	getShopName: function(shop){
		return shops.findOne({"_id":shop}).title;
	},
	items: function(){
		userid=Session.get('userId');
		console.log('cart'+	userid);
		return cart.find({"userId":userid});
	},
	total: function(){
		userid=Session.get('userId');
		console.log('cart'+	userid);
		var list=cart.find({"userId":userid}).fetch();
		var total=0;
		for(var i=0;i<list.length;i++){
			var p=products.findOne({"_id":list[i]});
			total=total+Number(p.price);
		}
		return total;

	},
	getProduct: function(id_product){
		return products.findOne({"_id":id_product});
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

		var userId=Meteor.userId();
		console.log("userid="+userId);
		//var ipAddress=this.request.connection.remoteAddress;
		var productid=this._id;
		var shopid=tpl.$("#shop").val();
		//console.log("ipAdresse"+ipAddress);
		Meteor.call("addToCart",userId,productid,shopid,qty);
	}
});