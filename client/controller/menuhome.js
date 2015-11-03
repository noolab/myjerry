Session.set('children1','');
Session.set('children2','');


Session.set('name','Pokoet');

Template.homepage.helpers({
	sections: function(){
		console.log("calling sections");
		console.log("liste="+list_product.find().fetch().length);
		return list_product.find({});
	},
	getProduct: function(id){
		console.log("calling getProduct");
		return products.findOne({"_id":id});
	}
});
Template.menuhome.helpers({
	
	getParent: function(){
		return categories.find({"parent":"0"});
	},
	getChildren: function(parent){
		return categories.find({"parent":parent});
	},
	getSessionChildren1: function(){
		return Session.get('children1');
	},
	getSessionChildren2: function(){
		return Session.get('children2');
	},
	getCat: function(parentid){
		if(parentid=='')
			return null;
		
		return categories.find({"parent":parentid});
	}
	,getName: function(){
		return Session.get('name');
	}
});
Template.menuhome.onRendered(function () {
	$(".megamenu").megamenu();

	
        var curSessionID =  Session.get('sessionid');
        if(!curSessionID){
          curSessionID = Session.setDefaultPersistent('sessionid', Random.id());
        }
        
        var routerName = Router.current().route.getName();
         //this.connection.clientAddress;
         
          Meteor.call('api', function(err, ip){
              if(!err){
                  Session.set('ip', ip); 
              }
              
          });
        
        var ip = Session.get('ip'); 
        //alert('IP:'+ip);
        var datestr = new Date().toString("yyyy-MM-dd HH:mm:ss");
        //var datestr = 'Thu Sep 17 2015 18:24:52 GMT+0700 (SE Asia Standard Time)';
        var timestamp = (new Date(datestr.split(".").join("-")).getTime())/1000;
        var userId=0;
        if(Meteor.userId()){
          userId =Meteor.userId();
        }

        var attr = { 
              "api_key": "ec0323e7058a08d788a9d37082334de0",
              "id_session":curSessionID,
              "idUser": userId,
              "ip_address":ip,
              "page_id":routerName,
              "timpestamp":timestamp
              } ;
        console.log(attr);
        var message = '';
        HTTP.post( "http://localhost:3030/api/v1/pizza", { 
          data: attr
        }, function( error, response ) {
          if ( error ) {
          	console.log("tracking:");
            console.log(error);
          } else {
            console.log( JSON.stringify(response.data.content) );
            console.log("Tracking success!");
            if( response.data.status == true){
              
            }
          }
        });
        
  
  
});





Template.menuhome.events({
	'mouseover #child1': function(e,tpl){
		var catId=this._id;
		
		Session.set('children1',catId);
		
	},
	'mouseover #child2': function(e,tpl){
		var catId=this._id;
		Session.set('children2',catId);
		console.log("hover!!!!! "+this.title);
	},
	'mouseleave #staticmenu': function(){
		console.log('resetting menu!');
		Session.set('children1','');
		Session.set('children2','');
	},
	'mouseenter #parentcategory': function(){
		console.log('resetting menu!');
		Session.set('children1','');
		Session.set('children2','');
	},
	'click #search': function(e,tpl){
		var search=tpl.$("textToSearch").val();
		
	},
	'click #search': function(e,tpl){
		var search=tpl.$("#textToSearch").val();
		//alert("search!"+search);
		var url="/search/"+search;
		Router.go(url);
		//var listProducts=products.find({"title":{"$regex": search}});
		
	}
	

});