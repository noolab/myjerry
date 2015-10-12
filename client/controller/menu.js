Session.set('children1','');
Session.set('children2','');


Session.set('name','Pokoet');
Template.menu.helpers({
	getParent: function(){
		return categories.find({"parent":"0"});
	},
	getChildren: function(parent){
		return categories.find({"parent":parent});
	},
	getSessionChildren1: function(){
		return Session.get('children1');
	},
	getSessionChildren2: function(){
		return Session.get('children2');
	},
	getCat: function(parentid){
		if(parentid=='')
			return null;
		
		return categories.find({"parent":parentid});
	}
	,getName: function(){
		return Session.get('name');
	}
});
Template.menu.onRendered(function () {
	$(".megamenu").megamenu();
  
});


Template.menu.events({
	'mouseover #child1': function(e,tpl){
		var catId=this._id;
		
		Session.set('children1',catId);
		c
	},
	'mouseover #child2': function(e,tpl){
		var catId=this._id;
		
		Session.set('children2',catId);
		console.log("hover!!!!! "+this.title);
	},
	

});