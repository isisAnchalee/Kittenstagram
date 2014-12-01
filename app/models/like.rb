class Like < ActiveRecord::Base
	validates :user_id, uniqueness: {scope: :photo_id}
	belongs_to :user
	belongs_to :photo
end
