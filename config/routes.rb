Rails.application.routes.draw do
  root to: 'static_pages#feed'
  resource :session, only: [:create, :new, :destroy]
  resource :users, only:[:new, :create]

 namespace :api, :defaults => { :format => :json } do
 		root "static_pages#feed"
 		get 'feed_photos', to: "photos#feed"
 		
		resources :users, only: [:show, :update, :destroy]
		resources :photos, only: [:index, :create, :show, :destroy]
    resources :likes, only: [:create]
    resource :feed, only: [:create]
		resources :comments, only: [:create, :index, :update, :destroy]
  end

end


