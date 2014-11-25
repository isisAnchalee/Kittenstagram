module Api

  class PhotosController < ApiController
    
    before_action :require_signed_in!, only: [:new, :create, :destroy]

    def show
      @photo = Photo.find(params[:id])
      render :show
    end

    def new
      @photo = current_user.photos.new
      render :new
    end

    def create
      @photo = current_user.photos.new(photo_params)
      @photo.save
      redirect_to users_url
    end

    def destroy
      @photo = Photo.find(params[:id])
      @photo.destroy
    end

    private
    def verify_signed_in
      redirect_to root_url if !signed_in?
    end

    def photo_params
      params.require(:photo).permit(:filepicker_url, :caption)
    end
  end
end