Kittenstagram.Models.Follow = Backbone.Model.extend({
	url:function(){
		return 'api/users/' + this.user.id + '/follow'
	},

	initialize: function(attributes, options){
		this.user = options.user;
	}

})