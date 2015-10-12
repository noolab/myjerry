Meteor.methods({
  insertFavorite:function(attr){
    favorite.insert(attr);
  }
});