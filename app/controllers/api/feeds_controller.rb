module Api
  class FeedsController < ApiController
    respond_to :json
    before_action :require_signed_in!

    def index
      @photos = current_user.photos
      @photos += current_user.followed_photos
      render :index
    end
  end
end