require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'
  
  namespace :api do
    namespace :v1 do
      resources :sessions, only: [:create, :destroy]
      resources :registrations, only: [:create, :destroy]
      resources :refresh_token, only: [:create]
      resources :decks, only: [:show, :index]

      post "decks/save_game", to: "decks#save_game"
    end
  end

  devise_for :teacher, controllers: {
    registrations: "teacher/registrations",
    sessions: "teacher/sessions"
  }
  devise_for :student, controllers: {
    omniauth_callbacks: "student/omniauth_callbacks",
    registrations: "student/registrations",
    sessions: "student/sessions"
  }
  devise_for :manager, controllers: {
    registrations: "manager/registrations",
    sessions: "manager/sessions"
  }
  get "/manager/dashboard", to: "manager/dashboard#index", as: "manager_dashboard"
  get "/teacher/dashboard", to: "teacher/dashboard#index", as: "teacher_dashboard"
  get "/student/dashboard", to: "student/dashboard#index", as: "student_dashboard"

  namespace :manager do
    resources :invitations
  end

  namespace :teacher do
    resources :invitations
    resources :students, except: [:new, :create]
    resources :groups
    resources :decks do
      post :download, on: :member
    end
  end

  root to: "pages#home"
end
