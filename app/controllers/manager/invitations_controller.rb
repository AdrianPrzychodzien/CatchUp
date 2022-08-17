class Manager::InvitationsController < ApplicationController
  before_action :set_invitation, only: [:show, :edit, :update, :destroy]
  before_action :select_columns, only: [:index, :show]
  before_action :destroy_all_batch_ids, only: [:index]

  layout "admin"

  def index
    @invitations = current_manager.invitations
  end

  def new
    @invitation = current_manager.invitations.new
  end

  def show
  end

  def create
    @invitation = current_manager.invitations.new(create_invitation_params)
    @invitation.organization = current_manager.organization

    if @invitation.save
      @invitation.send_invitation_email!
      redirect_to [:manager, @invitation], notice: t(".success_msg")
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @invitation.update(create_invitation_params)
      redirect_to [:manager, @invitation], notice: t(".success_msg")
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @invitation.destroy
    redirect_to [:manager, :invitations], status: :see_other, notice: t(".success_msg")
  end

  private

  def destroy_all_batch_ids
    invitations = current_manager.invitations.where.not(batch_id: nil)
    invitations.destroy_all if invitations
  end

  def set_batched_invitations
    @batched_invitations = current_manager.invitations.where(batch_id: params[:batch_id])
  end

  def select_columns
    @select_columns = ["id", "email", "created_at", "status"]
  end

  def set_invitation
    @invitation = current_manager.invitations.find(params[:id])
  end

  def create_invitation_params
    params.require(:invitation).permit(:email)
  end
end
