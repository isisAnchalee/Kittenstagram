module Api
  class CommentsController < ApiController
    respond_to :json
    before_action :require_signed_in!

    def index
      @photo = Photo.find(params[:photo_id])
      @comments = @photo.comments
      render :index
    end

    def create
      @comment = Comment.create(comment_params)
      @comment.user_id = current_user.id
      if @comment.save
        #need to include user profile pic and name
        render json: @comment
      else
        render json: @comment.errors.full_messages
      end
    end

    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy if (@comment.user_id == current_user.id)
      render json: @comment
    end

    private
    def comment_params
      params.require(:comment).permit(:photo_id, :body)
    end
  end
end