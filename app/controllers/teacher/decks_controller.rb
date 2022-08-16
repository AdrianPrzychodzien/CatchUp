class Teacher::DecksController < ApplicationController
  before_action :authenticate_teacher!
  before_action :select_columns

  layout "teacher"

  def new
    @deck = Deck.new
  end

  def index
    @decks = current_teacher.decks
  end

  def show
    @deck = Deck.find(params[:id])
  end

  def create
    @deck = current_teacher.decks.build(deck_params)

    if @deck.save
      redirect_to teacher_decks_path
    else
      render :new
    end
  end

  def download
    @deck = Deck.find(params[:id])
    anki_file = Teacher::CreateAnkiFileService.new(@deck).call

    send_file anki_file, filename: "#{@deck.name}.txt"
  end

  # def edit
  #     @deck = Deck.find(params[:id])
  # end

  # def update
  #     @deck = Deck.find(params[:id])
  #     if @deck.update(deck_params)
  #         redirect_to teacher_decks_path
  #     else
  #         render :edit
  #     end
  # end

  def destroy
    @deck = Deck.find(params[:id])
    @deck.destroy
    redirect_to [:teacher, :decks], status: :see_other
  end

  private

  def select_columns
    @select_columns = ["id", "name", "cards", "created_at"]
  end

  def deck_params
    params.require(:deck).permit(:name, cards: {})
  end
end
