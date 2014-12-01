Rails.application.routes.draw do
  root to: 'static_pages#index'
  resource :session, only: [:create, :new, :destroy]
  resource :users, only:[:new, :create]

 namespace :api, :defaults => { :format => :json } do
 		resources :feeds, only: [:index]

		resources :users, only: [:show, :update, :destroy] do 
			resource :follow, only: [:create, :destroy]
		end

		resources :photos, only: [:index, :create, :show, :destroy]
    resources :likes, only: [:create]
    delete 'likes', to: "likes#destroy"
		resources :comments, only: [:create, :index, :update, :destroy]
  end

end


