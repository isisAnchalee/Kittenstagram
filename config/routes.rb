Rails.application.routes.draw do
  root to: 'static_pages#feed'
  resource :session, only: [:create, :new, :destroy]
  resource :users, only:[:new, :create]

 namespace :api, :defaults => { :format => :json } do
 		root "static_pages#feed"

		resources :users, only: [:show, :update, :destroy]
    
		resources :photos, only: [:index, :create, :show, :destroy]


  end

end


