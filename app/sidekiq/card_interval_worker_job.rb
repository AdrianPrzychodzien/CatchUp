class CardIntervalWorkerJob
  include Sidekiq::Worker

  def perform(*args, delay_interval)
    deck_id = args[0]
    deck = Deck.find(deck_id)

    return if deck.updated_at > delay_interval
    
    deck.cards.each do |card|
      if card["interval"] && card["interval"] > 1
        card["interval"] -= 1
      end
    end

    deck.save
  end
end
