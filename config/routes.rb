Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users do 
  	resources :images, except: [:create, :destroy]
  end
  
  resources :images
  resource :session, only: [:create, :destroy]
end
