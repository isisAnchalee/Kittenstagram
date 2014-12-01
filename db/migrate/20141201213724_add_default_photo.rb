class AddDefaultPhoto < ActiveRecord::Migration
  def change
  	change_column :users, :profile_photo, :text, :default => "http://imageshack.com/a/img540/6453/GgU92Q.png"
  end
end
