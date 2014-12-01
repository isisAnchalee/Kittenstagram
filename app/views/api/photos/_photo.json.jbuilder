json.extract! photo, :id, :user_id, :filepicker_url, :caption, :created_at, :updated_at

json.user photo.user, :id, :username, :profile_photo

json.likes photo.likes

json.time_ago time_ago_in_words(photo.created_at)

json.comments photo.comments do |comment|
  json.id comment.id
  json.profile_pic comment.user.profile_photo
  json.username comment.user.username
  json.body comment.body
  json.user_id comment.user.id
end

json.likers photo.likers do |liker|
  json.id liker.id
  json.username liker.username
end