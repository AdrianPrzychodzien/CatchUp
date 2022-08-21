class Teacher::DecksController < ApplicationController
  before_action :authenticate_teacher!
  before_action :set_deck, only: [:show, :edit, :update, :destroy, :download]
  before_action :select_columns

  layout "admin"

  def new
    @deck = Deck.new
  end

  def index
    @decks = current_teacher.decks
  end

  def show
  end

  def create
    formated_cards = deck_params[:cards].values
    @deck = current_teacher.decks.build(deck_params.except(:cards))
    @deck.cards = formated_cards

    if @deck.save
      redirect_to teacher_decks_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    formated_cards = deck_params[:cards].values
    @deck.cards = formated_cards

    if @deck.update(deck_params.except(:cards))
      redirect_to [:teacher, :decks], status: :see_other
    else
      render :edit
    end
  end

  def destroy
    @deck.destroy
    redirect_to [:teacher, :decks], status: :see_other
  end

  def download
    txt_file, file_name = Teacher::CreateAnkiFileService.new(@deck, params[:format]).call

    send_file txt_file, filename: file_name
  end

  private

  def set_deck
    @deck = current_teacher.decks.find(params[:id])
  end

  def select_columns
    @select_columns = ["id", "name", "cards", "created_at"]
  end

  def deck_params
    params.require(:deck).permit(:name, cards: {})
  end
end
