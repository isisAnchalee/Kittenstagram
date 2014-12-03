module Api

  class PhotosController < ApiController
    wrap_parameters :photo, include: [:image]

    before_action :require_signed_in!, only: [:new, :create, :destroy]

    def show
      @photo = Photo.includes(:user, :comments).find(params[:id])
      render :show
    end

    def index
      @photos = Photo.all.includes(:user, :comments)
      render :index
    end

    def new
      @photo = current_user.photos.new
      render :new
    end

    def create
      @photo = current_user.photos.new(photo_params)
      fail
      @photo.save
      redirect_to root_url
    end

    def destroy
      @photo = Photo.find(params[:id])
      @photo.destroy
    end

    private
    def verify_signed_in
      redirect_to new_session_url if !signed_in?
    end

    def photo_params
      params.require(:photo).permit(:image)
    end
  end
end