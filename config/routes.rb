Rails.application.routes.draw do
  get 'static_pages/index_admin'

  #get 'users/new'

  #get 'languages/lang'


  root 'languages#lang'


  #we add the value of the local (the chosen language at the moment) in the URL before each action of the languages controller
  #example: /:locale/languages/new(.:format)
  

  get 'languages/lang', path: "/:locale/lang"
  post 'ajax' => "languages#ajax"
  get 'languages/send_email'

  resources :users, except: [:destroy]
  resources :account_activations, only: [:edit, :update]  

  delete 'users/destroy', path: "destroy/:id"


  get 'login/new' => 'sessions#new'
  post 'login/create' => 'sessions#create'
  get 'login/destroy' => 'sessions#destroy'
  
  post 'users/verify_old_password' => 'users#verify_old_password'
  post 'users/check_username' => 'users#check_username'

end
