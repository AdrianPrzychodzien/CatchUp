class Api::V1::DeckListSerializer < ActiveModel::Serializer
  attributes :id, :name, :all_cards_count, :playable_cards_count, :done_cards_count, :next_game_available_at

  HOURS_NUM_INTERVAL = 6

  def all_cards_count
    object.cards.count
  end

  def playable_cards_count
    not_done_cards
      .reject { |c| c["interval"] && c["interval"] > 1 }
      .count
  end

  def done_cards_count
    object.cards
      .count { |c| c["done"] }
  end

  def next_game_available_at
    arr = not_done_cards.map { |c| c["interval"] && c["interval"] > 1 && c["interval"] }
    lowest_interval = arr.min

    return unless lowest_interval

    updated_at = object.updated_at
    parsed_updated_at = DateTime.parse updated_at.to_s
    hours_num = (lowest_interval - 1) * HOURS_NUM_INTERVAL

    parsed_updated_at + hours_num.hours
  end

  private

  def not_done_cards
    object.cards
      .reject { |c| c["done"] }
  end
end
