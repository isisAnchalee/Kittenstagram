json.extract! photo, :id, :user_id, :filepicker_url, :caption, :created_at, :updated_at

json.user photo.user, :id, :username, :profile_photo

json.likes photo.likes

json.comments photo.comments do |comment|
  json.id comment.id
  json.profile_pic comment.user.profile_photo
  json.username comment.user.username
  json.body comment.body
end