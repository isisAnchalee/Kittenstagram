module Api
	class LikesController < ApiController
		respond_to :json
		
		before_action :require_signed_in!
		#TODO: set up the if else so we can send error responses too
		def create
			@like = Like.create(
      	user_id: current_user.id,
      	photo_id: params[:photo_id],
      )
 			# @photo = @like.photo
      render :template => 'api/likes/_like'
    end

    def destroy
    	@like = current_user.likes.find_by_photo_id(params[:photo_id])
    	@like.destroy!
      render :json => @like
    end

 		# def like_params
   #    params.require(:like).permit(:photo_id)
   #  end
	end
end