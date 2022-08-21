class Api::V1::DeckSerializer < ActiveModel::Serializer
    attributes :deck, :cards,

    def deck
        object
    end

    def cards
        object.cards.map do |card|
            {
                id: card["id"],
                question: card["question"],
                answer: card["answer"],
                difficulty: card["difficulty"],
                interval: card["interval"],
                prev_difficulty: card["prev_difficulty"],
                done: card["done"]
            }
        end
    end
end
