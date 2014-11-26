module Api
  CommentsController < ApiController
    respond_to :json
    before_action :require_signed_in!

    def index
      @photo = Photo.find(params[:photo_id])
      @comments = @photo.comments
      render :index
    end

    def create
      @comment = Comment.create(
        user_id: current_user.id,
        photo_id: params[:photo_id],
        body: params[:body]
        )

      render json: @comment
    end

    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy if (@comment.user_id == current_user.id)
      render json: @comment
    end

  end
end