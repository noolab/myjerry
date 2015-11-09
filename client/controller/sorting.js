Template.listing.events({
	//sorting list product
	'change #rating .rating': function(event, tmp){
		var value = $(event.target).val();
		console.log('click: '+value);
		Session.set('rating',value);
	},
	'click .brand': function(){
		var checked = [];

		$('#brand .brand').each( function(){
			if( this.checked ){
				checked.push($(this).val());
			}
		})
		Session.set('brand',checked);
	},
	'click .advance': function(){

		var checked = [];

		$('#advanced .advance').each( function(){

			if( this.checked ){
				checked.push($(this).val());
			}
		})
		Session.set('advance',checked);
	},

});
Template.listing.rendered = function(){
	$(function () {
		$("#refine").click(function(){
			$("#body_refine").slideToggle("slow");
		});
		//$('#sl2').slider();  
		$('#sl2').slider().on('slideStop', function(ev){
			var value = $('.tooltip-inner').text();
			data = value.split(":");
			console.log(value);
			Session.set('refine',data);
		});
	});
};