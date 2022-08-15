class Teacher::GroupsController < ApplicationController
    before_action :authenticate_teacher!

    layout "teacher"

    def index
        @groups = current_teacher.groups
    end

    def show
        @group = Group.find(params[:id])
    end
end
