Template.listpro.helpers({
	getProduct:function(){
		var result=products.find();
		
		return result;
	},
	getImage: function(id){

            var img = images.findOne({_id:id});
            //console.log(img);
            
            if(img){
                //console.log(img.copies.images.key);
                var obj= img.copies.images.key;
                
                return obj;
            }else{
                return;
            }
    }
});

Template.listpro.events({
    'click #favorite':function(e){
        
        
             e.preventDefault();
             var id=this._id;
             alert('ssss');
             if(Session.get('userId')){
                 //alert();
                 var obj={
                    proId:id,
                    userId:Session.get('userId')
                 }

                 Meteor.call('insertFavorite',obj);
                  alert('favorite');
            }
            else{
                Session.setPersistent('userId', Random.id())
                 //var ses=Session.get('userId');
                 alert();
                 var obj={
                    proId:id,
                    userId:Session.get('userId')
                 }

                 Meteor.call('insertFavorite',obj);
                 alert('hello');
            }
    },
    'click #remove':function(e){
        var id=this._id;
        //alert(id);
        var obj=favorite.findOne({proId:id});
        //alert(obj);
        favorite.remove(obj._id);
    }
});
Template.listpro.helpers({
    favoriteList:function(){
        var ses=Session.get('userId');
          var data=  favorite.find({userId:ses});
          var object=[];
          var obj={};
          data.forEach(function(entry) {
            var proid=entry.proId;
              obj=products.findOne({_id:proid})
              object.push(obj);
                
           });
          console.log(object);
        return object;
        
        
    }
})
