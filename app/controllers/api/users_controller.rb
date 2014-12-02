module Api

  class UsersController < ApiController
   respond_to :json

    before_action :require_signed_in!

    def index
      @users = User.all
      render :index
    end

    def show
      @user = User.includes(:photos).find(params[:id])
      render :show
    end

    def update
      @user = current_user

      @user.update_attributes(user_params)

      if @user.save
        render json: @user, except: [:id]
      else
        render json: { error: @user.errors.full_messages }
      end
    end

    private

    def user_params
      params.require(:user)
        .permit(:email, :bio, :gender, :profile_photo, :location, :password, :username)
    end
  end
end