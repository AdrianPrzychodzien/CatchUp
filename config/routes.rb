Rails.application.routes.draw do
  devise_for :teachers, controllers: {
    registrations: "teachers/registrations",
    sessions: "teachers/sessions"
  }
  devise_for :students, controllers: {
    omniauth_callbacks: "students/omniauth_callbacks",
    registrations: "students/registrations"
  }

  get "/teachers/dashboard", to: "teachers/dashboard#index", as: "teachers_dashboard"

  root to: "pages#home"
end
