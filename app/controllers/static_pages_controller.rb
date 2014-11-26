class StaticPagesController < ApplicationController
  before_action :require_signed_in!

  def feed
  	@photos = current_user.followed_photos.includes(:user, :comments)
  	render :index
  end
  
end
