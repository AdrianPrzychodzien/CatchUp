class Api::V1::DecksController < ApiController
  before_action :set_teacher

  def show
    deck = Deck.where(id: params[:id], teacher: @teacher).first

    if deck
      render json: {
        status: :ok,
        deck: deck.as_json(only: [:id, :name, :cards, :created_at, :updated_at]),
        cards_Count: deck.cards.count
      }
    else
      render json: {status: 401}
    end
  end

  def index
    decks = Deck.where(teacher: @teacher)

    if decks
      render json: {
        status: :ok,
        decks: decks.as_json(only: [:id, :name])
      }
    else
      render json: {status: 401}
    end
  end

  def save_game
    cardsToRemove = params[:cardsToRemove].map { |card| card["id"]}
    deck = Deck.where(id: params[:deckId], teacher: @teacher).first

    new_cards = deck.cards
    .map do |card|
      card_from_mobile = params["savedCards"].find { |card_from_mobile| card_from_mobile["id"] == card["id"] }
      new_card = {}

      if cardsToRemove.include?(card["id"])
        new_card = {
          **card,
          done: true
        }
      else
        new_card = {
          **card,
          difficulty: card_from_mobile["difficulty"],
          interval: card["interval"].nil? ? card_from_mobile["interval"] : card["interval"] - 1,
        }
  
        if card["difficulty"]
          new_card["prev_difficulty"] = card["difficulty"]
        end
      end

      new_card
    end

    deck.cards = new_cards

    if deck.save
      render json: {status: :ok}
    else
      render json: {status: :error}
    end
  end

  private

  def set_teacher
    @teacher = @current_student.teacher
  end
end
