Template.commendotion.helpers({
	dotion: function(){
		return products.find();
	},
	getImage: function(id){

            var img = images.findOne({_id:id});
            console.log(img);
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
    }
});