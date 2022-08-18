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
        decks: decks.as_json(only: [:id, :name, :cards, :created_at, :updated_at])
      }
    else
      render json: {status: 401}
    end
  end

  private

  def set_teacher
    @teacher = @current_student.teacher
  end
end
