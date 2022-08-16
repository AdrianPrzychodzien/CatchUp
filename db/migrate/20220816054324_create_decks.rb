class CreateDecks < ActiveRecord::Migration[7.0]
  def change
    create_table :decks do |t|
      t.references :teacher, foreign_key: true
      t.string :name
      t.jsonb :cards

      t.timestamps
    end
  end
end
