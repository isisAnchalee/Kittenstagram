class AddProfileImage < ActiveRecord::Migration
  def change
  	change_column :users, :profile_photo, :text
  end
end
