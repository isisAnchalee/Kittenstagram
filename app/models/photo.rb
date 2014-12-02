class Photo < ActiveRecord::Base
	validates :user_id, :filepicker_url, presence:true
	default_scope { order('created_at DESC') }

	belongs_to :user
	has_many :comments
	has_many :likes
	has_many :likers, through: :likes, source: :user
end

