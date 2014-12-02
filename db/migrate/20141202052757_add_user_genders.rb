class AddUserGenders < ActiveRecord::Migration
  def change
  	add_column :users, :gender, :string, :default => "?"
  end
end
