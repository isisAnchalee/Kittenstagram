class AddPhotoCation < ActiveRecord::Migration
  def change
  	add_column :photos, :caption, :text
  end
end
