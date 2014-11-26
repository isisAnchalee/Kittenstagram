module Api
  class FeedsController < ApiController
    respond_to :json
    
    before_action :require_signed_in!

    def create
      user = User.find_by_username(params[:username])

      @feed = current_user
      .feeds_following
      .find_by_follow_id(user.id)

      if @feed
        @feed.destroy
        render json: { "follow" => false }
      else 
        @feed = Feed.create(
          follower_id: current_user.id,
          followee_id: user.id
          )
        render json: { "follow" => true }
    end

  end
end