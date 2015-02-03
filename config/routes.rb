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

  resources :users
  resources :account_activations, only: [:edit, :update]


  

end
