class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
    	t.integer :follower_id, null:false
    	t.integer :followee_id, null:false
      t.timestamps 
    end

    add_index :feeds, :follower_id
    add_index :feeds, :followee_id
  end
end
