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
    cards_in_deck
  end

  private

  def cards_in_deck
    object.cards
      .reject { |c| c["done"] }
      .reject { |c| c["interval"] && c["interval"] > 1 }
      .map do |card|
      {
        id: card["id"],
        front: card["front"],
        back: card["back"]
      }
    end
  end
end
