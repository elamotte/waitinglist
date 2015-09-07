Waiters = new Mongo.Collection("waiters");

Meteor.methods({
	insertWaiter: function(waiter){
		NonEmptyString = Match.Where(function (x) {
			check(x, String);
			return x.length > 0;
		}); 
		check(waiter.name, NonEmptyString);
		check(waiter.email, NonEmptyString);

		newWaiter = Waiters.insert({name: waiter.name, email: waiter.email, shares : 0, createdAt : Date.now()}, function(error, result){});

		return newWaiter;

	},
	newWaiterShare: function(waiter){
		var waiter = Waiters.update({_id:waiter._id}, {$inc:{shares:1}});
		return waiter;
	}
})


getPosition = function (waiter) {
	var countGreaterScores = Waiters.find({"shares": {"$gt" : waiter.shares}}).count();
	var countSameScores = Waiters.find({"shares":waiter.shares}).count();

	position = countGreaterScores + 1;

	if(countSameScores > 1){
		countGreaterDates = Waiters.find({"shares":waiter.shares, "createdAt": {"$lt": waiter.createdAt}}).count();
		position = position + countGreaterDates;
	}

	return position;
}