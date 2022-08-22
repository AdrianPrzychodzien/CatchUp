class Api::V1::DeckSerializer < ActiveModel::Serializer
  attributes :deck, :cards

  def deck
    {
      id: object["id"],
      name: object["name"],
      created_at: object["created_at"],
      updated_at: object["updated_at"]
    }
  end

  def cards
    object.cards.map do |card|
      {
        id: card["id"],
        difficulty: card["difficulty"],
        interval: card["interval"],
        prev_difficulty: card["prev_difficulty"],
        done: card["done"]
      }
    end
  end
end
