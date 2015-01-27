Rails.application.routes.draw do
  #get 'languages/lang'


  root 'languages#lang'


  #we add the value of the local (the chosen language at the moment) in the URL before each action of the languages controller
  #example: /:locale/languages/new(.:format)
  

  get 'languages/lang', path: "/:locale/lang"
  post 'ajax' => "languages#ajax"

end
