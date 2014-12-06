module Api
  class FeedsController < ApiController
    respond_to :json
    before_action :require_signed_in!

    def index
      @photos = Photo.where(user_id: current_user.followed_user_ids + [current_user.id])
      render :index
    end

    def recent
    	@photos = Photo.limit(params[:count])
    	render :index
    end
  end
end



