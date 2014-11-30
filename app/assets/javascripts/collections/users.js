Kittenstagram.Collections.Users = Backbone.Collection.extend({
	url: '/api/users',

  model: Kittenstagram.Models.User,

  getOrFetch: function (id) {
	  var user = this.get(id),
	    users = this;
	  if(!user) {
	    user = new Kittenstagram.Models.user({ id: id });
	    user.fetch({
	      success: function () {
	        users.add(user);
	      },
	    });
	  } else {
	    user.fetch();
	  }
	  return user;
	}

});
