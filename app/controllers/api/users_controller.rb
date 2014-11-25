class Api::UsersController < ApplicationController
  respond_to :json



  # USER SHOW PAGE

  def show
    @user = User.find_by_username(params[:id])
    render :show
  end

  # EDIT PROFILE / DELETE ACCOUNT

  def update
    @user = current_user

    @user.update_attributes(user_params)

    if @user.save
      render json: @user, except: [:id]
    else
      render json: { error: @user.errors.full_messages }
    end
  end

  def destroy
    @user = current_user

    @user.destroy

    render json: { success: "Destroyed." }
  end

  def user_params
    params.require(:user)
      .permit(:username, :password, :full_name, :bio, :profilepic)
  end

end