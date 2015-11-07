 Meteor.methods({
  insertAttr:function(attr){
    attribute.insert(attr);
  },
  editAttr:function(id,attr){
    attribute.update({_id:id},{$set:attr});
  }
});
