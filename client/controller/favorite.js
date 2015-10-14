
Template.listpro.events({
    'click #favorite':function(e){
        
        
             e.preventDefault();
             var id=this._id;
             console.log('id'+Session.get('userId'));
             if(Session.get('userId')){
                 //alert();
                 var obj={
                    proId:id,
                    userId:Session.get('userId')
                 }

                 Meteor.call('insertFavorite',obj);
                  alert('Product successfully append to favorite!');
            }
            else{
            	var newId=Random.id();
                Session.setPersistent('userId',newId);
                 //var ses=Session.get('userId');
                 
                 var obj={
                    proId:id,
                    userId:Session.get('userId')
                 }

                 Meteor.call('insertFavorite',obj);
                 alert('Product successfully added to favorite!');
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
    	if(Session.get('userId')){
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
        
        
        
    },
    getProduct:function(){
    	console.log('abc');
		var result=products.find();
		//console.log(result.fetch.count());
		return result;
	}
});