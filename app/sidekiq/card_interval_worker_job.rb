class CardIntervalWorkerJob
  include Sidekiq::Worker
  # queue_as :default

  def perform(*args, delay)
    deck_id = args[0]
    deck = Deck.find(deck_id)

    return if deck.updated_at > Time.now + delay
    
    deck.cards.each do |card|
      if card["interval"] && card["interval"] > 1
        card["interval"] -= 1
      end
    end

    deck.save
  end
end
