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
    object.cards
      .reject { |c| c["done"] }
      .map do |card|
      {
        id: card["id"],
        front: card["front"],
        back: card["back"],
        difficulty: card["difficulty"],
        interval: card["interval"],
        prev_difficulty: card["prev_difficulty"]
      }
    end
  end
end
