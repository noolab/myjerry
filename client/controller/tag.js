// parent tags
Template.manageparenttag.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		var title = $('#title').val();
		var category_id = $('#category_id').val();
		//alert(title+ category);
		Meteor.call('addTag',title, category_id);
		
	}
});
Template.updateparenttag.events({
	'click #btnUpdate': function(e){
		e.preventDefault();
		var id = $('#idRecord').val();
		var title = $('#title').val();
		var category_id = $('#category_id').val();
		//alert(title+ category_id);
		var attributes = {
			title:title,
			category_id: category_id
		}
		Meteor.call('updateTag',id, attributes);
		Router.go('/manageparenttag');
	}
});
Template.updateparenttag.helpers({
	getName: function(name){
		var result = categories.findOne({_id: name});
		console.log(result.title);
		return result.title;
	}
	
});
Template.manageparenttag.helpers({
	getCat: function(){
		return categories.find({});
	},
	parentTags: function(){
		return parent_tags.find({});
	},
	catName: function(name){
		var result = categories.findOne({_id: name});
		return result.title;
	}
});
Template.manageparenttag.events({
	'click #remove': function(){
		var id = this._id;
		Meteor.call('remove', id);
	}
});

Template.managetag.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		var title = $('#title').val();
		var parent_id = $('#parent_id').val();
		//alert(title+ category);
		Meteor.call('addTagValue',title, parent_id);
		
	},
	'click #remove': function(){
		var id = this._id;
		Meteor.call('removeValue', id);
	}
});

Template.managetag.helpers({
	getParentTag: function(){
		return parent_tags.find({});
	},
	tags: function(){
		return tags.find({});
	},
	parentName: function(id){
		var result = parent_tags.findOne({_id: id});
		return result.title;
	}
});