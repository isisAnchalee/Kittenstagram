class PhotosController < ApplicationController
	def index
		@photos = Photo.all
		render json: @photos
	end

	def create
		@photo = current_user.photos.new(photo_params)

		if @photo.save
			render json: @photo
		else
			render json: @photo.errors.full_messages
		end
	end

	def destroy
		@photo = current_user.photos.find(params[:id])
		@photo.destroy
		render json: {}
	end

	def show
		@photo = Photo.find(params[:id])
		render json: @photo
	end


	private

	def photo_params
		params.require(:photo).permit(:filepicker_url)
	end
end
