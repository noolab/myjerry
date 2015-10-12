/*Start contents========================================================*/
Template.contents.events({
	'click #btnAdd': function(e){
		e.preventDefault();
		var datestr = new Date().toString("yyyy-MM-dd HH:mm:ss");
		//var datestr = 'Thu Sep 17 2015 18:24:52 GMT+0700 (SE Asia Standard Time)';
		var timestamp = (new Date(datestr.split(".").join("-")).getTime())/1000;
		//alert("post");
		var title =$('#title').val();
		var content =$('#content').val();
		var typeid =$('#type').val();
		var comment =$('#comment').val();
		var date = timestamp;
		var image =$('#image').val();
		var img_id = Session.get('ADDIMAGEID');
		Meteor.call('addContent', title, content, typeid, comment, date, img_id);
		Router.go('contenmember');
		console.log("Inserted");
	},
	'change #image': function(event, template) {
    var files = event.target.files;
    for (var i = 0, ln = files.length; i < ln; i++) {
      images.insert(files[i], function (err, fileObj) {
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
		Session.set('ADDIMAGEID', fileObj._id);
	  });
    }
  }
});
Template.contents.helpers({
	contentposttype: function(){
		return contents_type.find();
	}
});


/*End contents========================================================*/