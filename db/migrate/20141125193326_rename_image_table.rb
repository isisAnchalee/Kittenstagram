class RenameImageTable < ActiveRecord::Migration
  def change
  	rename_table :post_images, :image_posts
  end
end
