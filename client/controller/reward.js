Template.reward.helpers({
	getpoint: function(){
		var id = Meteor.userId();
		return Meteor.users.find({_id:id});
	},
	getproduct:function(){
		var point = Meteor.user().profile.shipcard.point;
		//console.log('MyResult:'+point);
		var p = Number(point);
		console.log('MyResult:'+p);
			var result = products.find({point:{$gte:0,$lte:p}});
			//console.log('MyProduct: '+result);
			return result;
		
	},
	getImage: function(id){
			//var id = this.image;
			//alert('display'+id);
			//console.log('Display:' + id);
			var img = images.findOne({_id:id});
			if(img){
				console.log(img.copies.images.key);
				return img.copies.images.key;
			}else{
				return;
			}
	}
});
Template.rewardsilver.helpers({
	getpoint: function(){
		var id = Meteor.userId();
		return Meteor.users.find({_id:id});
	},
	getproduct:function(){
		var point = Meteor.user().profile.shipcard.point;
		//console.log('MyResult:'+point);
		var p = Number(point);
		console.log('MyResult:'+p);
		var silver = 200;
		var gold = 300;
		var result = products.find({point:{$gte:silver,$lte:p}});
		return result;
	},
	getImage: function(id){
			//var id = this.image;
			//alert('display'+id);
			//console.log('Display:' + id);
			var img = images.findOne({_id:id});
			if(img){
				console.log(img.copies.images.key);
				return img.copies.images.key;
			}else{
				return;
			}
	}
});
Template.rewardgold.helpers({
	getpoint: function(){
		var id = Meteor.userId();
		return Meteor.users.find({_id:id});
	},
	getproduct:function(){
		var point = Meteor.user().profile.shipcard.point;
		//console.log('MyResult:'+point);
		var p = Number(point);
		console.log('MyResult:'+p);
		var gold = 300;
		var result = products.find({point:{$gte:gold,$lte:p}});
		return result;
	},
	getImage: function(id){
			//var id = this.image;
			//alert('display'+id);
			//console.log('Display:' + id);
			var img = images.findOne({_id:id});
			if(img){
				console.log(img.copies.images.key);
				return img.copies.images.key;
			}else{
				return;
			}
	}
});