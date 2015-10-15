 Meteor.methods({
  insertAttr:function(attr){
    attribute.insert(attr);
  }
});
//edit Attribute

Meteor.methods({
  editAttr:function(id,attr){
    attribute.update({_id:id},{$set:attr});
  }
});
images.allow({
  insert: function(userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return doc.creatorId == userId
    },
    download: function (userId, doc) {
        return doc.creatorId == userId
    }

});