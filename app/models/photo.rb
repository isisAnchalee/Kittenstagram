class Photo < ActiveRecord::Base
	validates :user_id, :filepicker_url, presence:true
	
	belongs_to :user
	has_many :comments
	has_many :likes
end
