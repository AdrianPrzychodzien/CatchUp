class Teachers::DashboardController < ApplicationController
    before_action :authenticate_teacher!

    def index
        @teachers = Teacher.all
        @all_students = Student.all
        @students = current_teacher.students
    end
end
