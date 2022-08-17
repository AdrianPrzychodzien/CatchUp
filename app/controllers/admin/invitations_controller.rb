module Admin
  class InvitationsController < AdminController
    before_action :set_invitation, only: [:show, :edit, :update, :destroy]
    before_action :select_columns, only: [:index, :show]
    before_action :destroy_all_batch_ids, only: [:index]

    def index
      @invitations = current_user.organization.invitations
    end

    def new
      @invitation = current_user.organization.invitations.new
    end

    def show
    end

    def create
      @invitation = current_user.organization.invitations.new(create_invitation_params)

      if @invitation.save
        @invitation.send_invitation_email!
        redirect_to [:admin, @invitation], notice: t(".success_msg")
      else
        render :new, status: :unprocessable_entity
      end
    end

    def update
      if @invitation.update(update_invitation_params)
        redirect_to [:admin, @invitation], notice: t(".success_msg")
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @invitation.destroy
      redirect_to [:admin, :invitations], status: :see_other, notice: t(".success_msg")
    end

    # def upload_csv
    #   batch_id, errors = Invitation.import(params[:invitation][:file], current_user.organization)
    #   redirect_to admin_invitations_preview_csv_path(batch_id: batch_id, errors: errors)
    # end

    private

    def destroy_all_batch_ids
      invitations = current_user.organization.invitations.where.not(batch_id: nil)
      invitations.destroy_all if invitations
    end

    # def set_batched_invitations
    #   @batched_invitations = current_user.organization.invitations.where(batch_id: params[:batch_id])
    # end

    def select_columns
      @select_columns = ["id", "email", "created_at", "status"]
    end

    def set_invitation
      @invitation = current_user.organization.invitations.find(params[:id])
      # @invitation = current_user.organization.invitations.last
    end

    def create_invitation_params
      params.require(:invitation).permit(:email)
    end

    def update_invitation_params
      params.require(:invitation).permit(group_ids: [])
    end
  end
end
