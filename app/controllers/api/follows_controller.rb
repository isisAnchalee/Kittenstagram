module Api
  class FollowsController < ApiController
    respond_to :json
    
    before_action :require_signed_in!

    def create
      user = User.find(params[:user_id])

      @follow = Follow.new(
        follower_id: current_user.id,
        followee_id: user.id
      )

      if @follow.save
        render json: @follow
      else
        render json: @follow.errors.full_messages, status: 422
      end
    end

    def destroy
      @follow = Follow.find_by(followee_id: params[:user_id], follower_id: current_user.id)
      @follow.try(:destroy)
      render json: { "follow" => false }
    end 

  end
end