class ChangeToPhotosTable < ActiveRecord::Migration
  def change
  	rename_table :image_posts, :photos
  end
end
