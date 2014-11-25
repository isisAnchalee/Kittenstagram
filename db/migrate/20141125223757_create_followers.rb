class CreateFollowers < ActiveRecord::Migration
  def change
    create_table :followers do |t|
    	t.integer :following_id, null:false
    	t.integer :follower_id, null:false
    end

    add_index :followers, :following_id
    add_index :followers, :follower_id
  end
end
