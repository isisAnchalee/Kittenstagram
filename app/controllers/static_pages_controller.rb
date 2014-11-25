class StaticPagesController < ApplicationController
  before_action :require_signed_in!

  def feed
  	@user = current_user
  	render :index
  end
  
end
