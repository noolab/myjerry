Meteor.methods({
/*Start content*/
	//member add content post
	addContent: function(title, content, typeid, comment, date, image, author) {
	//var userid = Meteor.user(this._id);
	var author = Meteor.userId();
  	var attributes={
  	title:title,
		content:content,
		typeid:typeid,
		comment:comment,
		date:date,
		image:image,
		author:author
  	};
  	contents.insert(attributes);
  }
});

/*End content*/