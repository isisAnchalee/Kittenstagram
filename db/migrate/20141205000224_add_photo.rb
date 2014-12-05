class AddPhoto < ActiveRecord::Migration
  def change
  	change_column :users, :profile_photo, :string, default: "https://s3.amazonaws.com/kittenstagramdev/images/photos/129.original."
  end
end
