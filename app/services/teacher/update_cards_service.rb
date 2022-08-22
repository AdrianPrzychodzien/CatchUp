class Teacher::UpdateCardsService
  def initialize(deck, formated_cards)
    @deck = deck
    @formated_cards = formated_cards
  end

  def call
    build_new_deck_cards
  end

  private

  def build_new_deck_cards
    actual_cards_ids, deleted_cards_ids = get_cards_ids

    new_cards = @formated_cards.reject { |card| actual_cards_ids.include?(card["id"]) }
    [*@deck.cards, *new_cards].reject { |card| deleted_cards_ids.include?(card["id"]) }
  end

  def get_cards_ids
    actual_cards_ids = @deck.cards.map { |card| card["id"] }
    formated_cards_ids = @formated_cards.map { |card| card["id"] }
    deleted_cards_ids = actual_cards_ids - formated_cards_ids

    [actual_cards_ids, deleted_cards_ids]
  end
end
