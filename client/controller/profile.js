Session.set('ADDAVATAR','');

Template.profile.helpers({
	getprofile:function(){
		var id = Meteor.userId();
		return Meteor.users.findOne({_id:id});
	}
});
Template.editprofile.helpers({
	getprofile:function(){
		var id = Meteor.userId();
		var profile = Meteor.users.find({_id:id});
		return profile;
		//console.log(profile+'UserId'+id);
	}
});
Template.editprofile.events({
	'click #addprofile': function(event){
        event.preventDefault();
        var birth = $('#birth').val();
        var gender = $('#gender').val();
        var address = $('#address').val();
        var life = $('#life').val();
        var id = Meteor.userId();
        var img_id = Session.get('ADDAVATAR');
        //var user=Meteor.userId();
        //alert(id+birth+gender+address+life);
        var attr = {
            birth:birth,
            gender:gender,
            avatar:img_id
        };
        var arr = {
            address:address,
            life:life
        }
        Meteor.call('editprofile',id,attr);
        Meteor.call('editarray',id,arr);
        Router.go('profile');
    },
    'change #upload': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            console.log(fileObj._id);
            Session.set('ADDAVATAR',fileObj._id);
            
          });
        }
    }
});
Template.profile.events({
	'click #btn-answer': function(e){
        var value=[];
        e.preventDefault();
        var id = Meteor.userId();
        var answer = $('[name=answer]');
        answer.each(function(i,val){
            //console.log($(this).val());
            if(val){
                var val=$(this).val();
                 value.push(val);
            }

        });
        console.log(value);
        
        //var id = Meteor.userId();
        //var qcmId = $('#qcmId').val();
        console.log('helooooo'+answer.length);
        var qcm = [];
        var question = $('[name=question]');
        question.each(function(i,val1){
            //console.log($(this).val());
            var val1=$(this).val();
            //console.log(val);
             qcm.push(val1);
        });
        var attr = [];
        for(var i=0;i<value.length;i++){
            obj = {
                qcmId:qcm[i],
                answer:value[i]
            }
            attr.push(obj);
        }
        //console.log(attr);
        var array = {answerdata:attr};

            Meteor.call('addanswer',id,array);

    }
});
Template.editprofile.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});