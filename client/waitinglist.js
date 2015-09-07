Meteor.subscribe('waiters');

Template.home.helpers({
	alreadyWaiter: function(){
		if(Session.get("waiterID")){
			var curUser = Waiters.findOne({_id: Session.get("waiterID")});
			if(curUser){
				return {_id:curUser._id, name:curUser.name, shares: curUser.shares, position:getPosition(curUser)}
			}

		}else{
			return null
		}
	}
});

Template.waiters.helpers({
	waiters: function(){
		return Waiters.find({}, {sort: {shares: -1, createdAt: 1}, limit:5});
	}

});

Template.form.events({
	'click .btn': function (event) {
		event.preventDefault();
		var name = $('#name').val();
		var email = $('#email').val();


		Meteor.call('insertWaiter', {name: name, email: email}, function (error, result) {
			if(result){
				Session.setPersistent("waiterID", result);
			}
		});
	}
});