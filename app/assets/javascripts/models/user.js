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
		});

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
