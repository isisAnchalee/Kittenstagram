json.extract! @user, :id, :username, :email, :bio, :created_at, :updated_at

json.photos @user.photos do |photo|
	json.id photo.id
	json.filepicker_url photo.filepicker_url
	json.caption photo.caption
end

json.photo_count @user.photos.length
