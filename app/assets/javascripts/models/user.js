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

	parse: function(response){
		
		if (response.photos){
			this.photos().set(response.photos, { parse: true })
			delete response.photos;
		}

		return response
	}
});
