module Api
	class LikesController < ApiController
		respond_to :json
		
		before_action :require_signed_in!

		def create
			@like = current_user.likes.find_by_photo_id(:photo_id)

			if @like
      	@like.destroy
      	render json: { "like" => false }
      else
 				@like = Like.create(
	        user_id: current_user.id,
	        photo_id: params[:photo_id],
	        )
      	render json: { "like" => true }
      end
    end
	end
end