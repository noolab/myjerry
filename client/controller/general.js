Template.registerHelper('getImg', function (id) {
            if(id.indexOf("/uploads")>-1){
                console.log('oldSafir');
                id=id.replace("/uploads/","");
                console.log('oldSafir2'+id);
                return id;
            }else{
                var img = images.findOne({_id:id});
            console.log("current img="+img);
            
            if(img){
                console.log(img.copies.images.key);
                return img.copies.images.key;
            }else{
                return;
            }
   
            }
            
});

Template.registerHelper('getDate', function (curdate) {
	var d = new Date(curdate);
	var str=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
    return str;
}); 

Template.registerHelper('recap', function (text) {
    return text.split(" ").splice(0,3).join(" ");
}); 