class Teachers::DashboardController < ApplicationController
    before_action :authenticate_teacher!

    def index
        @teachers = Teacher.all
    end
end
