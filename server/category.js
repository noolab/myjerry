Meteor.methods({
	// add categories
	addCat: function(title, parent, image) {
		var attributes={
			title:title,
			parent:parent,
			image:image
		};
		categories.insert(attributes);
		console.log("Inserted");
	},
	updateCat: function(id,attr) {
		categories.update({_id:id},{$set: attr});
	},
	deleteCategory: function(id){
		categories.remove(id);
	}
});