Kittenstagram.Models.User = Backbone.Model.extend({
	urlRoot: "/api/users",

	photos: function(){
		if (this._photos){
			return this._photos;
		} else {
			this._photos = new Kittenstagram.Collections.Photos([], { user: this });
			return this._photos;
		}
	},

	follow: function(){
		it (this._follow){
			return this._follow;
		} else {
			this._follow = new Kittenstagram.Models.Follow({}, { user: this });
			return this._follow;
		}
	},

	parse: function(response){
		
		if (response.photos){
			this.photos().set(response.photos, { parse: true })
			delete response.photos;
		}

		return response
	}
});
