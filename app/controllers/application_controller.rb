class ApplicationController < ActionController::Base
    before_action :set_namespace

    def set_namespace
        @namespace = if request.parameters["controller"].include?("teacher/")
          :teacher
        else
            request.parameters["controller"].include?("student/") ?
            :student : :admin
        end
    end
end
