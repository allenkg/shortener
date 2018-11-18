Rails.application.routes.draw do
  scope 'api' do
    # post 'auth/login', to: 'authentication#authenticate'
    # post 'signup', to: 'users#create'

    get '/:id' => "shortener/shortened_urls#show"

    resources :links
  end
end
