class ChangeImageCol < ActiveRecord::Migration
  def change
  	rename_column :photos, :image, :image
  end
end
