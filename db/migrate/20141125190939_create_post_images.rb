class CreatePostImages < ActiveRecord::Migration
  def change
    create_table :post_images do |t|
    	t.integer :user_id, null: false
    	t.string :filepicker_url, null: false

      t.timestamps
    end
  end
end
