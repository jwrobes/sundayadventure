Sundayadventure::Application.routes.draw do
  root :to => 'activities#index'

  get "activities/whatever", :to => 'activities#whatever'

end