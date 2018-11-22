Rails.application.routes.draw do
  scope 'api' do
    post 'auth/login', to: 'authentication#authenticate'
    post 'register', to: 'users#create'

    resources :links
    resources :link_proceeds
    resources :admin
  end
end
