class Follower < ActiveRecord::Base
	belongs_to(
		:followee,
		class_name: "User",
		foreign_key: :following_id,
		primary_key: :id
		)

  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: :follower_id,
    primary_key: :id
  )
end
