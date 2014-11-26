json.extract! photo, :id, :user_id, :filepicker_url, :caption, :created_at, :updated_at

json.user photo.user, :id, :username, :profile_photo
