class RenameFollowingCol < ActiveRecord::Migration
  def change
  	rename_column :follows, :following_id, :followee_id
  end
end
