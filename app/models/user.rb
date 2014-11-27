class User < ActiveRecord::Base
  validates :email, :username, :session_token, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :email, :username, uniqueness: true

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :photos, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy

  has_many :out_follows, foreign_key: :follower_id, class_name: 'Follow'

  #added
  has_many :in_follows, foreign_key: :followee_id, class_name: 'Follow'

  #added people following current user
  has_many :followers, through: :in_follows, source: :follower

  #people current user follows
  has_many :followed_users, through: :out_follows, source: :followee

  #need to get photos from feed
  has_many :followed_photos, through: :followed_users, source: :photos

  def self.find_by_credentials(username, password)
    user = User.where('LOWER(username) = ?', username.downcase).first
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

	def reset_token!
	  self.session_token = SecureRandom.urlsafe_base64(16)
	  self.save!
	  self.session_token
	end
	
  protected

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
