Rails.application.routes.draw do
  root 'home#index'
  
  resources :tutors, only: [:index, :show] do
    member do
      get 'experience'
    end
  end
  
  resources :schedules, only: [:index] do
    collection do
      get 'availability'
    end
  end
  
  resources :bookings do
    member do
      post 'confirm'
      post 'cancel'
    end
    collection do
      get 'check_availability'
    end
  end
  
  get 'pricing', to: 'pricing#index'
  get 'experience', to: 'tutors#experience'
  
  # API endpoints para calendario
  namespace :api do
    namespace :v1 do
      resources :schedules, only: [:index]
      resources :bookings, only: [:create]
    end
  end
end
