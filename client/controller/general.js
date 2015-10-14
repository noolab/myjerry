Template.registerHelper('getImg', function (id) {

            var img = images.findOne({_id:id});
            console.log(img);
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
   
});

Template.registerHelper('getDate', function (curdate) {
	var d = new Date(curdate);
	var str=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
    return str;
});