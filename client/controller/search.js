Template.search.events({
	'click .tag': function(e){
		var id=this._id+";";
		var position=Session.get('search').indexOf(id);
		console.log(position);
		if(position<0){
			var newVal=Session.get('search')+this._id+";";
			Session.set('search',newVal);
		}else{
			var newVal=Session.get('search').replace(this._id+";","");
			Session.set('search',newVal);
		}
		console.log("Search:"+Session.get('search'));
		
	},
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
    }
});


Template.search.helpers({
    parentTag: function(category){
        return parent_tags.find({"category_id":category});
    },
    tags: function(parent){
        return tags.find({parent:parent});
    },
    search: function(){
        return Session.get('search');
    },
    refine: function(){
        return Session.get('refine');
    },
    rating: function(){
        return Session.get('rating');
    }
    ,
    filter: function(list,search, refine, rating){
        console.log('list:'+list);
        console.log('search:'+search);
        console.log('rating:'+rating);
        console.log("rating.length: "+rating.length);
        var ids=list.split(";");
        var result;
        console.log("Refine: "+refine);
        if( refine.length > 0 || rating!=""){
            var min = parseInt(refine[0]);
            var max = parseInt(refine[1]);
            console.log("Min: "+min+"  /  Max:"+max);
            //console.log(rating);
            
            console.log("refine.length: "+refine.length);

            if(rating !="" && refine.length <= 0){
                rating = parseInt(rating);
                result = products.find({"review.grade":rating,'title': {'$regex': search}});
                console.log("size1:"+result.fetch().length);
            }   
            else if(refine.length > 0 && rating=="") {
                result = products.find({"price" : {$gte:min, $lte:max},'title': {'$regex': search}});
                console.log("size2:"+result.fetch().length);
            }
            else{
                rating = parseInt(rating);
                result = products.find({"review.grade":rating,"price" : {$gte:min, $lte:max},'title': {'$regex': search}});
                console.log("size3:"+result.fetch().length);
            }
                
        }
        //else if( refine.length > 0 )
        else{
            if(list ==""){
                result= products.find({'title': {'$regex': search}});
                console.log("size4:"+result.fetch().length);
            }else{
                result= products.find({"tags":{$in: ids},'title': {'$regex': search}});
                console.log("size5:"+result.fetch().length);
            }
            
            
        }
            
    
        //console.log(result.fetch()[0]);
        return result;
    }
});
