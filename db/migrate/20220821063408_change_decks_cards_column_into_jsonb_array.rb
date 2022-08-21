class ChangeDecksCardsColumnIntoJsonbArray < ActiveRecord::Migration[7.0]
  def change
    remove_column :decks, :cards
    add_column :decks, :cards, :jsonb, default: []
  end
end
