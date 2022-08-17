class CreateInvitations < ActiveRecord::Migration[7.0]
  def change
    create_table :invitations do |t|
      t.references :organization, null: false, foreign_key: true
      t.references :teacher
      t.string :token
      t.datetime :expite_at
      t.string :via
      t.string :status
      t.string :email
      t.string :batch_id

      t.timestamps
    end
  end
end
