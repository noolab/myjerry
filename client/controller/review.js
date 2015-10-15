Template.addreview.events({
	'click #addreview': function(e,tpl){
		var userid=Meteor.userId();
		if(userid==null){
			alert("You have to be logged to submit a review!");
			return;
		}

		var title=tpl.$("#title").val();
		var text=tpl.$("#comment").val();
		var grade=tpl.$("#grade").val();

		Meteor.call('addReview',title,text,grade,userid,this._id);
		alert("Review added successfully!")
	}
});