Kittenstagram.Models.Photo = Backbone.Model.extend({
	urlRoot: 'api/photos',
	user: function(){
		if (this._user){
			return this._user;
		} else {
			this._user = new Kittenstagram.Models.User();
			return this._user;
		}
	},

	parse: function(response){
		
		if (response.user){
			this.user().set(response.user, { parse: true })
			delete response.user
		}

		return response
	}
});
