json.extract! @user, :id, :username, :gender, :location, :email, :profile_photo, :bio, :created_at, :updated_at

json.photos @user.photos do |photo|
	json.id photo.id
	json.liked !!current_user.likes.find{ |like| like.photo_id == photo.id }
	json.filepicker_url photo.filepicker_url
	json.caption photo.caption

	json.likes photo.likes do |like|
		json.id like.id
		json.photo_id like.photo_id
		json.user_id like.user_id
		json.username like.user.username
		json.profile_photo like.user.profile_photo
	end

	json.comments photo.comments do |comment|
	  json.id comment.id
	  json.profile_pic comment.user.profile_photo
	  json.username comment.user.username
	  json.body comment.body
	  json.user_id comment.user.id
	end
end

if current_user.follows?(@user)
	follow = Follow.where(follower_id: current_user.id, followee_id: @user.id).first
	json.follow  do
		json.id follow.id
		json.followee_id follow.followee_id
		json.follower_id follow.follower_id
	end
end

json.photo_count @user.photos.length
json.follower_count @user.followers.length
json.following_count @user.followed_users.length