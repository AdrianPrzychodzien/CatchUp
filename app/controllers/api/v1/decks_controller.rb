class Api::V1::DecksController < ApiController
  before_action :set_teacher

  def show
    deck = Deck.where(id: params[:id], teacher: @teacher).first

    if deck
      render json: deck, serializer: Api::V1::DeckSerializer
    else
      render json: {status: 401}
    end
  end

  def index
    decks = Deck.where(teacher: @teacher)

    if decks
      render json: decks, each_serializer: Api::V1::DeckListSerializer
    else
      render json: {status: 401}
    end
  end

  def save_game
    deck = Deck.where(id: params[:deckId], teacher: @teacher).first

    is_success = Api::V1::SaveCardGameService.new(deck, params["savedCards"]).call

    if is_success
      delay_interval = Time.now + CARD_INTERVAL
      CardIntervalWorkerJob.perform_in(CARD_INTERVAL, deck.id, delay_interval)
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
