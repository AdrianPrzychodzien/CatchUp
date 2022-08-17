class Teacher::DashboardController < ApplicationController
  before_action :authenticate_teacher!

  layout "admin"

  def index
    @teachers = Teacher.all
    @all_students = Student.all
    @students = current_teacher.students
  end
end
