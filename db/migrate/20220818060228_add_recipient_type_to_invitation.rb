class AddRecipientTypeToInvitation < ActiveRecord::Migration[7.0]
  def change
    add_column :invitations, :recipient_type, :string
  end
end
