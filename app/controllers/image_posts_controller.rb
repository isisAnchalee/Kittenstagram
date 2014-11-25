class ImagePostsController < ApplicationController
	def index
		@posts = Post.all
		render json: @posts
	end

	def create
		@image_post = current_user.image_posts.new(image_post_params)

		if @image_post.save
			render json: @image_post
		else
			render json: @image_post.errors.full_messages
		end
	end

	def destroy
		@image_post = current_user.image_posts.find(params[:id])
		@image_post.destroy
		render json: {}
	end

	def show
		@image_post = Post.find(params[:id])
		render json: @image_post
	end


	private

	def image_post_params
		params.require(:image_post).permit(:filepicker_url)
	end
end
