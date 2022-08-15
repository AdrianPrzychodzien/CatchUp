class Teacher::StudentsController < ApplicationController
    before_action :authenticate_teacher!

    layout "teacher"

    def index
        @students = current_teacher.students
    end

    def show
        @student = Student.find(params[:id])
        @student_group = @student.group
    end
end
