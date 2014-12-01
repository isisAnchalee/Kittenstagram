class Photo < ActiveRecord::Base
	validates :user_id, :filepicker_url, presence:true
	default_scope { order('created_at') } 
	
	belongs_to :user
	has_many :comments
	has_many :likes
	has_many :likers, through: :likes, source: :user
end


#default scope passing block-- block has ActiveRecord assiations order id descending