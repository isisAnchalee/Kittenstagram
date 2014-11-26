class DropNotJoinedTable < ActiveRecord::Migration
  def change
  	drop_table :feeds
  end
end
