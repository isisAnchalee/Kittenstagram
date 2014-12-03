json.extract! photo, :id, :user_id, :created_at, :updated_at
json.liked !!current_user.likes.find{ |like| like.photo_id == photo.id }

json.user photo.user, :id, :username, :profile_photo

json.likes photo.likes do |like|
	json.id like.id
	json.photo_id like.photo_id
	json.user_id like.user_id
	json.username like.user.username
	json.profile_photo like.user.profile_photo
end

json.url photo.image.url
json.thumb_url photo.image.url(:thumb)

json.likes_count photo.likers.length

json.time_ago time_ago_in_words(photo.created_at)

json.comments photo.comments do |comment|
  json.id comment.id
  json.profile_pic comment.user.profile_photo
  json.username comment.user.username
  json.body comment.body
  json.user_id comment.user.id
end