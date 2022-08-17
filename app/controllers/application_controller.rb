class ApplicationController < ActionController::Base
  before_action :set_namespace
  before_action :configure_permitted_parameters, if: :devise_controller?

  def set_namespace
    manager_namespace? = request.parameters["controller"].include?("manager/")
    teacher_namespace? = request.parameters["controller"].include?("teacher/")
    
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
