class Api::V1::SaveCardGameService
  def initialize(deck, saved_cards)
    @deck = deck
    @saved_cards = saved_cards
  end

  def call
    build_new_cards
    success?
  end

  private

  def build_new_cards
    @new_cards = @deck.cards
      .map do |card|
      card_from_mobile = get_card_from_mobile(card["id"])
      is_done = sign_card_as_done?(card_from_mobile, card)

      new_card = {}

      if is_done
        new_card = {
          **card,
          done: true
        }
      else
        new_card = {
          **card,
          difficulty: card_from_mobile["difficulty"],
          interval: card["interval"].nil? ? card_from_mobile["interval"] : card["interval"] - 1
        }

        if card["difficulty"]
          new_card["prev_difficulty"] = card["difficulty"]
        end
      end

      new_card
    end
  end

  def get_card_from_mobile(id)
    @saved_cards.find { |card| card["id"] == id }
  end

  def sign_card_as_done?(card, card_from_mobile)
    card["difficulty"] == "easy" && card["prev_difficulty"] == "easy" && card_from_mobile["difficulty"] == "easy"
  end

  def success?
    @deck.cards = @new_cards
    @deck.save
  end
end
