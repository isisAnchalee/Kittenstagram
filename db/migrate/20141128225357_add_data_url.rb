class AddDataUrl < ActiveRecord::Migration
  def change
  	change_column :photos, :filepicker_url, :text
  end
end
