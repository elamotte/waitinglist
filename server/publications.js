Meteor.publish('waiters', function(){
	return Waiters.find({}, {fields: {'name':1, 'shares':1, 'createdAt':1}});
})