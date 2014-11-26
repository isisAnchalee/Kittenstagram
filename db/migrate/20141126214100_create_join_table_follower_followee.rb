class CreateJoinTableFollowerFollowee < ActiveRecord::Migration
  def change
    create_join_table :followers, :followees do |t|
    	t.integer :follower_id, null: false
    	t.integer :followee_id, null: false
    	
      t.index [:follower_id, :followee_id]
      t.index [:followee_id, :follower_id]
    end
  end
end
