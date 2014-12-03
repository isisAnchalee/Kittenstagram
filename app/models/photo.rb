class Photo < ActiveRecord::Base
	validates :user_id, :image, presence:true
	default_scope { order('created_at DESC') }

  has_attached_file :image, :styles => {
    :big => "500x500>",
    :small => "85x85#"
  }

  validates_attachment_content_type(
    :image,
    :content_type => /\Aimage\/.*\Z/
  )

	belongs_to :user
	has_many :comments
	has_many :likes
	has_many :likers, through: :likes, source: :user
end

