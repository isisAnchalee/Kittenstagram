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

	likes: function(){
		if (this._likes){
			return this._likes;
		} else {
			this._likes = new Kittenstagram.Collections.Likes();
			return this._likes;
		}
	},

	parse: function(response){
		
		if (response.user){
			this.user().set(response.user, { parse: true })
			delete response.user;
		}
		if (response.comments){
			this.comments().set(response.comments, { parse: true });
			delete response.comments;
		}
		if (response.likes){
			this.likes().set(response.likes, { parse: true });
			delete response.likes;
		}

		return response
	}
});
