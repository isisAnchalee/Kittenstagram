json.extract! @like :id, :photo_id, :user_id

json.liker User.find(@like.user_id)