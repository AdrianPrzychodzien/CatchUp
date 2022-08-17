class RenameExpireAtInInvitation < ActiveRecord::Migration[7.0]
  def change
    rename_column :invitations, :expite_at, :expire_at
  end
end
