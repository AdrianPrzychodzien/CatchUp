Rails.application.routes.draw do
  devise_for :students

  root to: 'home#index'
end
