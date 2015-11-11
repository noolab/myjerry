// add Products
Session.set("tags", "");
Session.set("category", "");
Session.set("filter","");
Session.set("attributes","");
Session.set('selected_attr','No attribute');
Session.set("tag_filter",'');


Session.set("parentAttr","");
Session.set('ADDIMAGEID', "");
Session.set('ADDIMAGEID_ATTR', "");
Meteor.call('getPath',function(err,res){
				Session.set('path',res);
			});
Template.addproduct.events({
	'click #add_attr': function(e,tpl){
		var price=tpl.$('#price_attr').val();
		var point=tpl.$('#point_attr').val();
		var attr=tpl.$('#attribute').val();

		var str=Session.get('attributes');
		str=str+price+':'+point+':'+attr+';';
		Session.set('attributes',str);
		console.log(Session.get('attributes'));
	},
	'click #btnAdd': function(e){
		e.preventDefault();
		var title = $('#title').val();
		var description = $('#description').val();
		var price = $('#price').val();
		var point = $('#point').val();
		var priority = $('#priority').val();
		var image = $('#image').val();
		var img_id = Session.get('ADDIMAGEID');
		var text = 0;
		var rate = 0;
		var date = new Date();
		var category = $('#category').val();
		var status = 0;
		var ratio=100;
		

		var alltags=Session.get('tags');
		alltags=alltags.split(';');

		jsonToSend=[];
		if(alltags!= null){
			for(var i=0;i<alltags.length;i++){
				var current=alltags[i];
				if(current!='null' && current!='')
					jsonToSend.push(current);
			}
		}

		var attr=Session.get('attributes');
		attr=attr.split(';');

		listAttr=[];
		if(attr!= null){
			for(var i=0;i<attr.length;i++){
				var current=attr[i];
				var vals=current.split(':');
				var obj={'attribute_id':vals[2],'price':vals[0],'point':vals[1]};
				if(current!='null' && current!='')
					listAttr.push(obj);
			}
		}

		Meteor.call('addPro',title, description, price,point,img_id, category, status,ratio,jsonToSend,listAttr,priority);
		Router.go('/manageproduct');
	},
	'change select': function(e,tpl){
		var category=tpl.$('#category').val();
		Session.set('category',category);
		//console.log('heho');
		console.log(category);
	},

	'change #parent_attr': function(e,tpl){
		var parent=tpl.$("#parent_attr").val();
		Session.set('parentAttr',parent);
	},
	// upload image
	'change #image': function(event, template) {
	//e.preventDefault();
    var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
				images.insert(files[i], function (err, fileObj) {
				 //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
				Session.set('ADDIMAGEID', fileObj._id);
			});
			//console.log(files[i]);
		}
		console.log('img uploaded!');
	},
	'click #tagAdd': function(e,tpl){
		console.log('start');
		var nameTag="#tag_"+this._id;
		var value=tpl.$(nameTag).val();

		var listTags=Session.get("tags")+value+";";
		Session.set("tags", listTags);
		console.log('tag:'+Session.get("tags"));
	}
});
Template.updateproduct.events({
	'click #btnUpdate': function(e){
		e.preventDefault();
		//alert("Update products");
		var id = $('#idRecord').val();
		var title = $('#title').val();
		var description = $('#description').val();
		var price = $('#price').val();
		var point = $('#point').val();
		var image = $('#image').val();
		var img_id = Session.get('UPDATEIMAGEID');
		var text = 0;
		var rate = 0;
		var date = new Date();
		var category = $('#category').val();
		var shop_id = $('#shop').val();
		var instock = $('#instock').val();
		var attributes = {
			title:title,
			description:description,
			price:price,
			point:point,
			img_id:img_id,
			review: {text:text, rate:rate, date:date},
			category:category,
			shop_id:shop_id,
			instock:instock
		};
		Meteor.call('updatePro',id, attributes);
		Router.go('/manageproduct');
	},
	// upload image
	'change #image': function(event, template) {
    var files = event.target.files;
		for (var i = 0, ln = files.length; i < ln; i++) {
				images.insert(files[i], function (err, fileObj) {
				 //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
				Session.set('UPDATEIMAGEID', fileObj._id);
			});
			//console.log(files[i]);
		}
	}
});
// helpers products
Template.addproduct.helpers({
	listTag: function(){
		if(Session.get('tags')=='')
			return;
		var liste=Session.get('tags').split(";");
		var tab=[];
		for(var i=0;i<liste.length;i++){
			var currentTag=tags.findOne({"_id":liste[i]})
			tab.push(currentTag);
		}
		return tab;
	},
	listAttr: function(){
		if(Session.get('attributes')=='')
			return;
		var liste=Session.get('attributes').split(";");
		var tab=[];
		for(var i=0;i<liste.length;i++){
			var line=liste[i].split(":");
			var obj={
				price:line[0],
				point:line[1],
				attribute:line[2]
			};
			tab.push(obj);
		}
		return tab;
	},
	getParentNameTag: function(parent){
		return parent_tags.findOne({"_id":parent}).title;
	},
	getAttributeName: function(id){
		if(id=='')
			return;
		return attribute.findOne({"_id":id}).value;
	},
	getParentName: function(id_attr){
		if(id_attr=='')
			return;
		var parent=attribute.findOne({"_id":id_attr}).parentId;
		return parentattr.findOne({"_id":parent}).name;
	},
	getCat: function(){
		return categories.find({});
	},
	getShop: function(){
		return shops.find({});
	},
	parentTag: function(category){
		if(category==null)
			return parent_tags.find({});
		else
			return parent_tags.find({"category_id":category});
	},
	getTag: function(parentid){
		console.log('parent='+parentid);
		return tags.find({"parent":parentid});
	},
	myTags: function () {
    	return Session.get("tags");
  },
  	category: function(){
  		return Session.get('category');
  	},
  	getParentAttr: function(){
  		return parentattr.find();
  	},
  	getAttr: function(parent){
  		return attribute.find({"parentId": parent});
  	},
  	parentAttr: function(){
  		return Session.get('parentAttr');
  	}
});

Template.updateproduct.helpers({
	catName: function(cat){
		if(cat==0)
			return;
		var result = categories.findOne({_id:cat});
		Session.set('data',result.title);
		return result.title;
	},
	catAll: function(){
		var catName = Session.get('data');
		return categories.find({title:{$ne:catName}});
	},
	getShop: function(){
		return shops.find({});
	}
});
Template.manageproduct.events({
	'click #remove': function(){
		var id = this._id;
		Meteor.call('deletePro', id);
	},
	'click #publish': function(e){
		e.preventDefault();
		var id = this._id;
		var status = 0;
		var attributes = {
			status:status
		};
		Meteor.call('publishPro',id, attributes);
	},
	"click #unpublish": function(e) {
		e.preventDefault();
		var id = this._id;
		var status = 1;
		var attr = {
			status:status
		};
		Meteor.call('unpublishPro',id, attr);
	}
});

Template.add_review.events({
	'click #commentok': function(e,tpl){
		var title=tpl.$("#title").val();
		var comment=tpl.$("#comment").val();
		var grade=tpl.$("#grade").val();
		var user=Meteor.user()._id;
		var productid=this._id;
		Meteor.call("add_review",title,comment,grade,user,productid);
	}
});

Template.details.events({
	'click .octofilter-link':function(e,tpl){

		alert('heho');
	},
	'click #filterok': function(e,tpl){
		var username=tpl.$("#filter").val();
		Session.set("filter",username);
		
	},
	'click #img_attr':function(e,tpl){
		var title=attribute.findOne({"_id":this._id}).value;
		var product=attribute.findOne({"_id":this._id});
		
		if(product.price!=-1){
			Session.set('selected_price',product.price);
			Session.set('selected_point',product.point);
			Session.set('selected_attr',title);
		}
			
		var url=product.productImage;
		url=url.replace('uploads','upload');
		tpl.$("#imageDetails").attr('src',url);

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
    },
    'click #addtocart':function(e,tpl){
        
        
             e.preventDefault();
             var id_product=this._id;
             var qty=tpl.$("#qty").val();
             var shop=tpl.$("#shop").val();
             var attribute=Session.get('selected_attr');

             if(shop==''){
             	alert("Please select a shop!");
             	return;
             }
             if(attribute=='No attribute')
             	attribute='';

             
             if(Session.get('userId')){
                 //alert();
                 var obj={
                    id_product:id_product,
                    userId:Session.get('userId'),
                    quantity:qty,
                    shop:shop,
                    attribute:attribute
                 };

                 Meteor.call('addtocart',obj);
                  alert('Product successfully append to cart!');
            }
            else{
            	var newId=Random.id();
                Session.setPersistent('userId',newId);
                 //var ses=Session.get('userId');
                 
                 var obj={
                    id_product:id_product,
                    userId:Session.get('userId'),
                    quantity:qty,
                    shop:shop,
                    attribute:attribute
                 };

                 Meteor.call('addtocart',obj);
                 alert('Product successfully added to cart!');
            }
    },
});

Template.manageproduct.helpers({
	managePro: function(){
		var data= products.find({});
		if(data.count()<=0){
			return false;
		}
		else{
			return data;
		}
	},
	catName: function(cat){
		var result = categories.findOne({_id:cat});
		return result.title;
	},
	checkStatus: function(status){
		if(status === 0){
			return false;
		}
		else{
			return true;
		}
	},
	shopName: function(name){
		if(name=='0')
			return;
		var result = shops.findOne({_id: name});
		return result.title;
	},
	shopIn: function(nameIn){
		var result = shops.findOne({_id:nameIn});
		return result.instock;
	}
	,
	// upload image
	getImage: function(id){

			var img = images.findOne({_id:id});
			if(img){
				console.log(img.copies.images.key);
				return img.copies.images.key;
			}else{
				return;
			}
	}
});

Template.details.helpers({
	articles: function(title){
		return content.find({"content":{"$regex":title}});
	},
	getAllAttributes: function(productId,parent){
		return attribute.find({"product":productId,"parent":parent});
	},
	getParentDetails: function(parent){
		return parentattr.findOne({"_id":parent});
	},
	listAttr: function(parent){
		console.log("OLDID="+parent);
		return attribute.find({"product":parent});
	},
	getParentAttr: function(product){
		console.log('cherche les attr de '+product);
		var list=attribute.find({"product":product}).fetch();
		var out=[];
		for(var i=0;i<list.length;i++){
			var contains=0;
			for(var j=0;j<out.length;j++)
				if(out[j].parent==list[i].parent)
					contains=1;
			if(contains==0)
				out.push(list[i]);
		}
			
		return out;
	},
	getShops: function(id){
		return shops.find({"products.product":id,"products.quantity":{ "$nin": ["0"] }});
	},
	getAttribute: function(id){
  		
  		return attribute.findOne({"_id": id});
  	},
	getTagName: function(tagid){
		if(tagid!=null)
			return tags.findOne({_id:tagid}).title;
		else
			return;
	},
	getAttr: function(id){
		return attribute.findOne({"_id":id});
	},
	getCategoryName: function(categoryid){
		console.log("cat:"+categoryid);
		if(categoryid!=null)
			return categories.findOne({_id:categoryid}).title;
		else
			return;
	},
	getReviews: function(reviews){
		if(Session.get("filter")=="")
			return reviews;
		else{
			var ret=[];
			for(var i=0;i<reviews.length;i++){
				var current=reviews[i];
				var currentAuthor=users.findOne({_id:current.user});
				if(currentAuthor.emails[0].address==Session.get("filter"))
					ret.push(current);
			}
			return ret;
		}
	},
	path: function(){
		return Session.get('path');
	},
	selected_attr: function(){
		return Session.get('selected_attr');
	},
	selected_price: function(){
		return Session.get('selected_price');
	},
	selected_point: function(){
		return Session.get('selected_point');
	}
});




Template.details.onRendered(function(){

	Session.set('selected_price',this.data.price/1000);
	Session.set('selected_point',this.data.point);
	
	
});



Template.details.rendered=function(){
	$('#input').octofilter({
			 
			  source: {
				Grade: ['1/5 ', '2/5 ', '3/5 ', '4/5 ', '5/5 '],
				Tag: ['Happy ', 'Cheap ' , 'Great ','Bad '],
				Age: ['15-25 ','25-35 ' , '35-50 ', '50+'],
				Hair:['Black ','White']
			  }
			});
	$('.container').click();

	$('.octofilter-link').click(function() {
		console.log("TRIGGER");
		var value=$( this ).text();
		if($( this ).hasClass('octofiltered')){//delete
			
			var tagSession=Session.get("tag_filter");
			var indexTag=tagSession.indexOf(value);
			tagSession=tagSession.replace(value+';','');
			Session.set("tag_filter",tagSession);
		}else{
			var tagSession=Session.get("tag_filter");
			if(tagSession.indexOf(value)<0){
				tagSession=tagSession+value+';';
				Session.set("tag_filter",tagSession);
			}
			
		}
		console.log(Session.get("tag_filter"));
	  alert( "HOP" );

	});
	/*alert("finish");
	$(".gallery-top").Swiper({
	    nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10,
        loop:true,
        loopedSlides: 3, //looped slides should be the same 
    });

  	$(".gallery-thumbs").Swiper({
  			spaceBetween: 10,
	        slidesPerView: 3,
	        touchRatio: 0.2,
	        loop:true,
	        loopedSlides: 3, //looped slides should be the same
	        slideToClickedSlide: true
        });
  	
  	galleryTop = new Swiper('.gallery-top', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10,
        loop:true,
        loopedSlides: 3, //looped slides should be the same     
    });
    galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 3,
        touchRatio: 0.2,
        loop:true,
        loopedSlides: 3, //looped slides should be the same
        slideToClickedSlide: true
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;*/
  	//alert("finish");
};
// datetimepicker
Template.addproduct.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});
Template.updateproduct.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});