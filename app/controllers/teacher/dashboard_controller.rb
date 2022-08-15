class Teacher::DashboardController < ApplicationController
    before_action :authenticate_teacher!

    layout "teacher"

    def index
        @teachers = Teacher.all
        @all_students = Student.all
        @students = current_teacher.students
    end
end
