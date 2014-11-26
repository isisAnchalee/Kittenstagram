class StaticPagesController < ApplicationController
  before_action :require_signed_in!

  def index
  	render :index
  end
  
end
