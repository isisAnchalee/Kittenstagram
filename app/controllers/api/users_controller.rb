module Api

  class UsersController < ApiController
   respond_to :json

    before_action :verify_signed_in

    def show
      @user = User.find_by_username(params[:id])
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
        .permit(:email, :bio, :password, :username)
    end
  end
end