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

	comments: function(){
		if (this._comments){
			return this._comments;
		} else {
			this._comments = new Kittenstagram.Collections.Comments([], { photo: this });
			return this._comments;
		}
	},

	parse: function(response){
		
		if (response.user){
			this.user().set(response.user, { parse: true })
			delete response.user
		}
		if (response.comments){
			this.comments().set(response.comments, { parse: true });
			delete response.comments
		}

		return response
	}
});
