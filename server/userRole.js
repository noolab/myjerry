Meteor.startup(function () {
  if (Meteor.users.find().fetch().length === 0) {
    var users = [
        {name:"Normal User",email:"member@noolab.com",roles:['member']},
        {name:"Admin User",email:"admin@noolab.com",roles:['admin']}
      ];

    _.each(users, function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: "apple1",
        profile: { name: user.name }
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come 
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles, 'mygroup');
      }

    });
  }
});

Meteor.methods({
  deleteuser: function(id) {
    return Meteor.users.remove(id);
  },
  updateUserRole:function(id,attrRole){
    return Meteor.users.update(id,{$set:{roles:attrRole}});
  },
  updateEmail:function(id,attrEmail){
    return Meteor.users.update(id,{$set:attrEmail});
  },
  registerUser:function(username,email,password,role){
    targetUserId=Accounts.createUser({
        username:username,
        email: email,
        password: password
       });
    console.log(targetUserId);
    // Roles.setUserRoles(id,'member')
    Roles.setUserRoles(targetUserId, [role], 'mygroup')
  }


});
