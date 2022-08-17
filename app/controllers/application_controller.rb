class ApplicationController < ActionController::Base
  include ApplicationHelper
  
  before_action :set_namespace
  before_action :configure_permitted_parameters, if: :devise_controller?

  def set_namespace
    @namespace = if manager_namespace?
      :manager
    elsif teacher_namespace?
      :teacher
    else
      :student
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:token])
  end
end
