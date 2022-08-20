class Api::V1::TestController < ApiController
  skip_before_action :authenticate_request

  def index
    render json: {
      status: :ok,
      decks: Deck.all.as_json
    }
  end
end
