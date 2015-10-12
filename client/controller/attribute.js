//attribute CRUD
Template.attribute.events({
    'submit form':function(e){
        e.preventDefault();
        var parentId=e.target.selectParent.value;
        var value=e.target.value.value
        var image =$('#image').val();
        var img_id = Session.get('ADDIMAGEID');
        //alert(name+''+value);
        var obj={
            parentId:parentId,
            value:value,
            productImage:img_id
        }
        Meteor.call('insertAttr',obj);
        e.target.name.value='';
        e.target.value.value='';
    },
    'change #image': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            console.log(fileObj._id);
            Session.set('ADDIMAGEID', fileObj._id);
          });
        }
    }
})
Template.attribute.helpers({
    datashow:function(){
        return attribute.find();
    },
    getImage: function(id){

            var img = images.findOne({_id:id});
            console.log(img);
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
    },
    getparent:function(){
        return parentattr.find();
    }
})
//Delete attribute
Template.attribute.events({
    'click #bnt_delete':function(e){
        e.preventDefault();
        var result = attribute.findOne({_id:this._id});
        var id=result.productImage;
        var result=confirm('Do you want to delete?');
        //alert(id);
        if(result){
            attribute.remove(this._id);
            //delete file
            images.remove(id, function(err, file) {
            if (err) {
              console.log('error', err);
            } else {
              console.log('remove success');
              success();
                };
            });
        }
    },
    
})
Template.editattr.events({
    'submit form':function(e){
        e.preventDefault();
        var name=e.target.name.value;
        var value=e.target.value.value;
        var parentId=e.target.selectParent.value;
        var id=e.target.id_edit.value;
        alert(id);
        var image =$('#image').val();
        var img_id = Session.get('ADDIMAGEID');
        //alert(name+''+value);
        var obj={
            parentId:parentId,
            value:value,
            productImage:img_id
        }
        Meteor.call('editAttr',id,obj);
        Router.go('attribute');
    },
    'change #image': function(event, template) {
        var files = event.target.files;
        for (var i = 0, ln = files.length; i < ln; i++) {
          images.insert(files[i], function (err, fileObj) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            console.log(fileObj._id);
            Session.set('ADDIMAGEID', fileObj._id);
          });
        }
    }
})
Template.editattr.helpers({
    getImage: function(){
                var id=Session.get('id');
                console.log(id);
            var img = images.findOne({_id:id});
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
    },
    getparentToEdit:function(){
        var id=Session.get('parentID');
        return parentattr.find({_id:{$ne:id}});
    }
});
Template.editattr.events({
    'click #btn_remov_file':function(e){
        e.preventDefault();
        var id_edit=Session.get('attrId');
        //alert(id_edit);
        var result = attribute.findOne({_id:id_edit});
        var id=result.productImage;
        var result=confirm('Do you want to delete?');
        //alert(id);
        if(result){
            //delete file
            images.remove(id, function(err, file) {
            if (err) {
              console.log('error', err);
            } else {
              console.log('remove success');
              success();
                };
            });
        }
    },
    
})