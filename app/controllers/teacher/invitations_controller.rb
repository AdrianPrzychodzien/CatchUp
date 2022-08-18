class Teacher::InvitationsController < ApplicationController
  before_action :authenticate_teacher!
  before_action :set_invitation, only: [:show, :edit, :update, :destroy]
  before_action :select_columns, only: [:index, :show]
  before_action :destroy_all_batch_ids, only: [:index]

  layout "admin"

  def index
    @invitations = current_teacher.invitations
  end

  def new
    @invitation = current_teacher.invitations.new
  end

  def show
  end

  def create
    @invitation = current_teacher.invitations.new(create_invitation_params)
    @invitation.teacher = current_teacher
    @invitation.organization = current_teacher.organization
    @invitation.recipient_type = "student"

    if @invitation.save
      @invitation.send_invitation_email!
      redirect_to [:teacher, @invitation], notice: t(".success_msg")
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @invitation.update(create_invitation_params)
      redirect_to [:teacher, @invitation], notice: t(".success_msg")
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @invitation.destroy
    redirect_to [:teacher, :invitations], status: :see_other, notice: t(".success_msg")
  end

  private

  def destroy_all_batch_ids
    invitations = current_teacher.invitations.where.not(batch_id: nil)
    invitations&.destroy_all
  end

  def set_batched_invitations
    @batched_invitations = current_teacher.invitations.where(batch_id: params[:batch_id])
  end

  def select_columns
    @select_columns = ["id", "email", "created_at", "status"]
  end

  def set_invitation
    @invitation = current_teacher.invitations.find(params[:id])
  end

  def create_invitation_params
    params.require(:invitation).permit(:email, :group_id)
  end
end
