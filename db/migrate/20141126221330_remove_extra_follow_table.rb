class RemoveExtraFollowTable < ActiveRecord::Migration
  def change
  	drop_table :followees_followers
  end
end
