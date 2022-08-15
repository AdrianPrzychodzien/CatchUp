Rails.application.routes.draw do
  devise_for :teacher, controllers: {
    registrations: "teacher/registrations",
    sessions: "teacher/sessions"
  }
  devise_for :student, controllers: {
    omniauth_callbacks: "student/omniauth_callbacks",
    registrations: "student/registrations"
  }
 
  get "/teacher/dashboard", to: "teacher/dashboard#index", as: "teacher_dashboard"
  
  namespace :teacher do
    resources :students, only: [:index, :show]
    resources :groups, only: [:index, :show]
  end

  root to: "pages#home"
end
