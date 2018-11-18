Rails.application.routes.draw do
  scope 'api' do
    post 'auth/login', to: 'authentication#authenticate'
    post 'signup', to: 'users#create'

    resources :links
  end
end
