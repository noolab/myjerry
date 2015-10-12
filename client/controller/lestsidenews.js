Template.lestsidenews.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
		Router.go('/')
    },
});
Template.lestsidenews.helpers({
	profileLog:function(){
		var userid = Meteor.userId();
		return Meteor.users.find({_id:userid});
		}
});
