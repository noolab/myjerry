 //insert parentAttribute
  Meteor.methods({
  inserparentAttr:function(attr){
    parentattr.insert(attr);
  }
});
//edit parentAttribute
Meteor.methods({
  editparentAttr:function(id,attr){
    parentattr.update({_id:id},{$set:attr});
  }
});