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
		 if (this._follow){
			return this._follow;
		} else {
			this._follow = new Kittenstagram.Models.Follow({}, { user: this });
			return this._follow;
		}
	},

	likes: function(){
		if (this._likes){
			return this._likes
		} else {
			this._likes = new Kittenstagram.Models.Like({}, { user: this });
			return this._likes;
		}
	},

	parse: function(response){
		
		if (response.photos){
			this.photos().set(response.photos, { parse: true })
			delete response.photos;
		}

		if (response.follow){
			this.follow().set(response.follow, { parse: true });
			delete response.follow;
		}

		if (response.likes){
			this.likes().set(response.likes, { parse: true });
			delete response.likes
		}

		return response
	}
});
