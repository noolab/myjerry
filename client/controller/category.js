Session.set("search",'');
// add categories
Template.addcategory.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		var title = $('#title').val();
		var parent = $('#parent').val();
		var image = $('#image').val();
		//alert(title+parent);
		Meteor.call("addCat", title, parent, image);
		Router.go("/managecategory");
	}
});
Template.updatecategory.events({
	"click #btnUpdate": function(e) {
		//alert("Update");
		var id = $("#idRecord").val();
		var title = $('#title').val();
		var parent = $('#parent').val();
		var image = $('#image').val();
		var attr={
			title:title,
			parent:parent,
			image:image
		};
		Meteor.call('updateCat',id, attr);
		Router.go('/manageCategory');   
	}
});
Template.managecategory.events({
	'click #remove': function(e){
		e.preventDefault();
		var id = this._id;
		Meteor.call('deleteCategory', id);
		
	}
});
// helpers categories
Template.addcategory.helpers({
	getCategories: function(){	
		return categories.find();
	}	
});	
Template.updatecategory.helpers({
	getCat: function(cat){
		var cats = categories.findOne({_id:cat});
		Session.set('data',cats.title);
		return cats.title;
	},
	getCatall: function(){
		var catName = Session.get('data');
		return categories.find({title:{$ne:catName}});
	}
});	
Template.managecategory.helpers({
	manageCat: function(){
		var result = categories.find({});
		console.log(result);
		return result;
	},
	catName: function(cat){
		if(cat=='0')
			return;
		var result = categories.findOne({_id:cat});
		return result.title;
	}
});

Template.search.helpers({
	parentTag: function(){
		return parent_tags.find();
	},
	tags: function(parent){
		return tags.find({parent:parent});
	},
	search: function(){
		return Session.get('search');
	},
	filter: function(list){
		var ids=list.split(";");
		var result;
		if(list=="")
			result= products.find();
		else
			result= products.find({"tags":{$in: ids}});

		console.log("Result:"+result.fetch().length);
		return result;
	}
});

Template.search.events({
	'click .tag': function(e){
		var id=this._id+";";
		var position=Session.get('search').indexOf(id);
		console.log(position);
		if(position<0){
			var newVal=Session.get('search')+this._id+";";
			Session.set('search',newVal);
		}else{
			var newVal=Session.get('search').replace(this._id+";","");
			Session.set('search',newVal);
		}
		console.log("Search:"+Session.get('search'));
		
	}
});


Template.listing.helpers({
	parentTag: function(category){
		return parent_tags.find({"category_id":category});
	},
	tags: function(parent){
		return tags.find({parent:parent});
	},
	search: function(){
		return Session.get('search');
	},
	filter: function(list,category){
		var ids=list.split(";");
		var result;
		if(list=="")
			result= products.find();
		else
			result= products.find({"tags":{$in: ids},"category":category});

		console.log("Result:"+result.fetch().length);
		return result;
	}
});

Template.listing.events({
	'click .tag': function(e){
		var id=this._id+";";
		var position=Session.get('search').indexOf(id);
		console.log(position);
		if(position<0){
			var newVal=Session.get('search')+this._id+";";
			Session.set('search',newVal);
		}else{
			var newVal=Session.get('search').replace(this._id+";","");
			Session.set('search',newVal);
		}
		console.log("Search:"+Session.get('search'));
		
	}
});