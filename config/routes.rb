Rails.application.routes.draw do
  devise_for :students, controllers: {
    omniauth_callbacks: "students/omniauth_callbacks"
  }

  root to: 'pages#home'
end
