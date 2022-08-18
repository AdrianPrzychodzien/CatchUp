class AddGroupToInvitation < ActiveRecord::Migration[7.0]
  def change
    add_column :invitations, :group_id, :integer
  end
end
