Template.addreview.events({
	'click #addreview': function(e,tpl){
		var userid=Meteor.userId();
		if(userid==null){
			alert("You have to be logged to submit a review!");
			return;
		}

		var title=tpl.$("#title").val();
		var text=tpl.$("#comment").val();
		var grade=tpl.$("#sel1").val();

		Meteor.call('addReview',title,text,grade,userid,this._id);
		alert("Review added successfully!")
	},
	'click #bt_review': function(e,tpl){
		if(tpl.$("#add_review").css("display")=='none')
			tpl.$("#add_review").css("display","block");
		else
			tpl.$("#add_review").css("display",'none');
	}
});

Template.review.helpers({
	getUsername: function(userid){
		return users.findOne({_id:userid}).emails[0].address;
	},
	getImgUrl: function(userid){
		var user=users.findOne({"_id":userid});
		var img = images.findOne({_id:user.avatar});
            console.log("current img="+img);
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
	}
});