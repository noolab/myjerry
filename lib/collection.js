
products = new Meteor.Collection('products');// collection products
//pageproduct = new Meteor.Collection('products');
categories = new Meteor.Collection('categories');// collection categories
shops = new Meteor.Collection('shops');
parent_tags = new Meteor.Collection('parent_tags');
tags = new Meteor.Collection('tags');
stats = new Mongo.Collection('stats');
allproducts = products;
fullpath="public/uploads";


if (Meteor.isServer) {
fullpath=process.env.PWD;
fullpath=fullpath+'/public/upload';
console.log("myPath:"+fullpath);
}
else{
	fullpath="/";
}

images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path:fullpath})]
});

attribute = new Mongo.Collection('attribute');

parentattr = new Mongo.Collection('parentattr');
users = Meteor.users;
cart=new Mongo.Collection('cart');
contents = new Meteor.Collection('contents');
contents_type = new Meteor.Collection('contents_type');
address = new Mongo.Collection('address');
favorite = new Mongo.Collection('favorite');
question = new Mongo.Collection('question');
journey=new Mongo.Collection('journey');//added by djisse
linkselling=new Mongo.Collection('linkselling');//added by djisse
membershipcard = new Mongo.Collection('membershipcard');
list_product = new Mongo.Collection('list_product');