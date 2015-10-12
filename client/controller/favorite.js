Template.scroll.events({
	'click #favorite':function(e){
		
		var id=[this._id];
		//console.log(id);
		//var data= products.findOne({_id:id});
		var ses=Session.get('ses');
		if(ses){
			arrid=id.push(ses);
		}
		else{
			arrid=id;
		}
		console.log(arrid);
		Session.set('id',arrid);
	}
});
Template.scroll.helpers({
	favoriteList:function(){
		
		
	}
})