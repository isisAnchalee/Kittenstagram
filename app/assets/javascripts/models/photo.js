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

	addLike: function(likeData){
		var like = new Kittenstagram.Models.Like(likeData);
		this.likes().add(like);
	},

	removeLike: function(likeData){
		this.likes().remove(likeData.id);
	},

	toggleLike: function(successCallback){
		//make an ajax request to like a photo
		var type = "POST";
		var likeCallback = this.addLike.bind(this);
		if(this.get('liked')){
			type = "DELETE";
			likeCallback = this.removeLike.bind(this);
		}
		var that = this;
		$.ajax({
			url: 'api/likes',
			data: { photo_id: this.id },
			method: type,
			success: function(response){
				that.set('liked', !that.get('liked'));
				//the next line will either add or remove this like 
				likeCallback(response);
				successCallback();
			}
		})

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
			this.likes().set(response.likes);
			delete response.likes;
		}

		return response
	}
});
