Router.configure({
    layoutTemplate: 'mainLayout'
});

// admin Products
Router.route('/manageproduct',{
	name:'manageproduct'
});

Router.route('/',{
    layoutTemplate: 'homeLayout',
    name:'homepage'
});

Router.route('/addproduct',{
	name:'addproduct'
});
Router.route('/updateproduct/:_id',{
	name: 'updateproduct',
	data: function(){
        var id = this.params._id;
        var da = products.findOne({_id: id });
		return da;
    }
});



// admin categories
Router.route('/managecategory',{
	name: 'managecategory'
});
Router.route('/addcategory',{
	name: 'addcategory'
	
});

Router.route('/listing2',{
    name: 'listing2'
    
});
Router.route('/updatecategory/:_id',{
	name: 'updatecategory',
	data: function(){
        var id = this.params._id;
        var da = categories.findOne({_id: id });
		return da;
    }
});

// shop
Router.route('/manageshop',{
	name:'manageshop'
});

Router.route('/shopdetail/:id',{
	name:'shopdetail',
	data: function(){
        var id = this.params.id;
        var da = shops.findOne({_id: id });
		return da;
    }
});

Router.route('/updateshop/:_id',{
	name: 'updateshop',
	data: function(){
        var id = this.params._id;
        var da = shops.findOne({_id: id });
		return da;
    }
});

// parent tags
Router.route('/manageparenttag',{
		name:'manageparenttag'
});
Router.route('/updateparenttag/:_id',{
		name:'updateparenttag',
		data: function(){
			var id = this.params._id;
			var result = parent_tags.findOne({_id: id});
			return result;
		}
});
// tags
Router.route('/managetag',{
		name:'managetag'
});

// tags
Router.route('/search/:text',{
		name:'search',
        data: function() {
        return {text:this.params.text};
    }
});

Router.route('/category/:id',{
        name:'listing',
        data: function() {
        return categories.findOne({_id: this.params.id});
    }
});

//Parent Attribute
Router.route('/parentattr', {
    name: 'parentattr',
    
});

Router.route('/editparentattr/:_id', {
    name: 'editparentattr',
    data: function() {
        return parentattr.findOne({_id: this.params._id});
    },

    
});
//Attribute
Router.route('/attribute', {
    name: 'attribute',
    
});
Router.route('/editattr/:_id', {
    name: 'editattr',
    data: function() {
        var attr= attribute.findOne({_id: this.params._id});
        Session.setPersistent('id',attr.productImage);//store field productImage to use in helper to get file dispay
        Session.setPersistent('attrId',this.params._id);//store id attribute to use delete file
        var id =attr.parentId;
        var parent=parentattr.findOne({_id:id})
        Session.setPersistent('parentID',parent._id);//store id parent attribute to find where not equal parentId
        var dataAll={
            attr:attr,
            parent:parent
        }
        return dataAll;
    }

    
});
Router.route('/recommendation', {
    name: 'recommendation',
    
});

Router.route('/details/:id', {
    name: 'details',
    data: function() {
        return products.findOne({_id: this.params.id});
    }
    
});
/**=== Chantern ===**/
Router.route('/login', {
    name: 'login'
});
// register
Router.route('/register', {
    name: 'register'
});




// Address
Router.route('/address', {
    name: 'address'
    
});
Router.route('/addaddress', {
    name: 'addaddress'
    
});
Router.route('/address/view/:_id', {
    name: 'viewaddress',
    data: function() {
        return address.findOne({_id: this.params._id});
    },  
});
Router.route('/updateaddress/edit/:_id', {
    name: 'updateaddress',
    data: function() {
       return address.findOne({_id: this.params._id});
    },  
});

// favorite
Router.route('/listpro', {
    name: 'listpro',
    
});
//mange Role userrs
Router.route('/managerole',{
        name:'manageRole'
});
Router.route('/updateuser/:id', {
    name: 'updateuser',
    data: function() {
        return Meteor.users.findOne({_id: this.params.id});
    }
    
});
//profile
Router.route('/profile', {
    name: 'profile' 
});
Router.route('/editprofile', {
    name: 'editprofile'  
});

Router.route('/journey', {
    name: 'journey'  
});


Router.route('/linkselling', {
    name: 'linkselling'  
});

// Member shipcard
Router.route('/membershipcard', {
    name: 'membershipcard'
});
Router.route('/edit/:_id', {
    name: 'edit',
    data: function() {
        return membershipcard.findOne({_id: this.params._id});
    }
});
Router.route('/memberwomenblack', {
    name: 'blackwomen'
});
Router.route('/membermenblack', {
    name: 'blackmen'
});
Router.route('/memberwomengold', {
    name: 'goldwomen'
});
Router.route('/membermengold', {
    name: 'goldmen'
});
Router.route('/memberwomensilver', {
    name: 'silverwomen'
});
Router.route('/membermensilver', {
    name: 'silvermen'
});

Router.route('/reward', {
    name: 'reward'
});

Router.route('/contents', {
    name: 'contents'
});
Router.route('/contenmember', {
    name: 'contenmember'
});
Router.route('/lestsidenews', {
    name: 'lestsidenews'
});
Router.route('/contennews', {
    name: 'contennews'
});
Router.route('/contentuto', {
    name: 'contentuto'
});
Router.route('/tuto', {
    name: 'tuto'
});
Router.route('/tutodetails/:_id', {
    name: 'tutodetails',
    data: function() {
        return categories.findOne({_id: this.params._id});
    }
});
Router.route('/contentdetails/:_id', {
    name: 'contentdetails',
    data: function() {
        return contents.findOne({_id: this.params._id});
    }
});
Router.route('/contenttype', {
    name: 'contenttype'
});
Router.route('/updatenewcontent/:_id', {
    name: 'updatenewcontent',
    data: function(){
        var id = this.params._id;
        var da =contents.findOne({_id: id });
        return da;
    }
});

// Looks Page
Router.route('/lookpage', {
    name: 'looks'  
});
Router.route('/page', {
    name: 'pagelook'  
});
Router.route('/lookdetail/:_id', {
    name: 'lookdetail' ,
    data: function(){
         return contents.findOne({_id: this.params._id});
    } 
});
Router.route('/look1', {
    name: 'look1'  
});
Router.route('/look2', {
    name: 'look2'  
});
