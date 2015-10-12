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