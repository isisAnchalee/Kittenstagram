class User < ActiveRecord::Base
  validates :email, :username, :session_token, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :email, :username, uniqueness: true

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :photos
  has_many :comments
  has_many :likes

  has_many(
    :feeds_following,
    class_name: "Feed",
    foreign_key: :follower_id,
    primary_key: :id
    )

  has_many(
    :feeds_followed,
    class_name: "Feed",
    foreign_key: :followee_id,
    primary_key: :id,
    dependent: :destroy
    )

  #people following current user
  has_many :followers, through: :feeds_followed, source: :follower

  #people current user follows
  has_many :follows, through: :feeds_following, source: :follow 

  #photos in follows feed
  has_many :feed_photos, through: :follows, source: :photos

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
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
