/*var IR_BeforeHooks = {
    
    getStats: function() { 
        var url=this.request.url;
        var ip=headers.getClientIP();
        Meteor.call('getStats',ip,url);
        this.next()
     },
    
}

// (Global) Before hooks for any route
Router.onBeforeAction(IR_BeforeHooks.getStats);*/
var IR_BeforeHooks = {
   
    checkLogin: function() { 
      	var loggedInUser = Meteor.user();

		if (!loggedInUser ||!Roles.userIsInRole(loggedInUser, ['Admin User','admin'],'mygroup')) {
	     	 this.render('login');
	     
	    }
	    else{

	    	 this.next();
	    }
	    if (!loggedInUser ||!Roles.userIsInRole(loggedInUser, ['Normal User','member'],'mygroup')) {
	     	 this.render('login');
	    }
	    else{
	    	 this.next();
	    }
	   
     },
     checkReward:function(){
     	var user = Meteor.userId();
     	if(user==null || user=='undefined')
     		this.render('login');
     	var point = Meteor.user().profile.shipcard.point;
     	//alert('MyUSer: '+point);
     	var p = Number(point);
		var silver = 200;
		var gold = 300;
		if(p >= silver && p < gold){
			this.render('rewardsilver');
		}
		else if(p >= gold){
			this.render('rewardgold');
		}
		else{
			this.render('reward');
		}
     }
    
}
Router.onBeforeAction(IR_BeforeHooks.checkReward, {
	only: ['reward'],
	except: ['admin']
});
/*Router.onBeforeAction(IR_BeforeHooks.checkLogin, {
	//only: ['admin']
	except: ['admin']
});*/