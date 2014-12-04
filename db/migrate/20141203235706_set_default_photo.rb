class SetDefaultPhoto < ActiveRecord::Migration
  def change
  	change_column :users, :profile_photo, :string, default: 'https://s3.amazonaws.com/kittenstagramdev/images/photos/92.original.'
  end
end
