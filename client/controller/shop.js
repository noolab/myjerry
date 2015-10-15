// shops 
Template.manageshop.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		var title = $('#title').val();
		
		//alert(title);
		Meteor.call("addShop", title);
		Router.go("/manageshop");
	},
	'click #remove': function(id){
		var id = this._id;
		Meteor.call('deleteShop', id)
	}
});
Template.updateshop.events({
	'click #btnUpdate': function(e){
		e.preventDefault();
		var id = $('#idRecord').val();
		var title = $('#title').val();
		
		var attributes = {
			title:title,
		}
		//alert(title);
		Meteor.call("updateShop",id, attributes);
		Router.go("/manageshop");
	}
});
Template.updateshop.helpers({
	getShop: function(){
		var result = products.find({});
		console.log(result);
		return result;
	}
});
Template.manageshop.helpers({
	listShop: function(){
		return shops.find({});
	}
});

Template.shopdetail.helpers({
	getProducts: function(){
		var result = products.find();
		console.log(result);
		return result;
	},
	getQuantity: function(shop,productid){
		console.log('hooo'+Template.parentData(0)._id);
		if(shop==null)
			return 0;
		var id=shop._id;
		var shop=shops.findOne({_id: id });
		var quantities=shop.products;
		if(quantities==null)
			return 0;
		else{
			var qty=0;
			for(var i=0;i<quantities.length;i++){
				var curItem=quantities[i];
				if(curItem.product==productid)
					qty=curItem.quantity;
			}
			return qty;
		}
	}
});

Template.shopdetail.events({
	'click #btnUpdate': function(e,tpl){
		e.preventDefault();
		var shopid=tpl.$("#shopid").val();
		var productId=this._id;
		var namediv="#product_"+productId;
		console.log(namediv);
		var qty=tpl.$(namediv).val();
		console.log("shop="+shopid+";productid="+productId);
		Meteor.call('updateQty',shopid,productId,qty);
		
	}
});