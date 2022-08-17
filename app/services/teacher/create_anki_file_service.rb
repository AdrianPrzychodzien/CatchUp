require "csv"

class Teacher::CreateAnkiFileService
  TXT_FILE = "anki.txt"
  CSV_FILE = "anki.csv"

  def initialize(deck, format = "txt")
    @deck = deck
    @format = format
  end

  def call
    create_file
  end

  def create_file
    case @format
    when "txt"
      create_txt_file
    when "csv"
      create_csv_file
    end
  end

  def create_txt_file
    anki_file = TXT_FILE

    File.open(anki_file, "w") do |file|
      parsed_cards.each do |card|
        front = card["front"]
        back = card["back"]
        file.write("#{front}; #{back}\n")
      end
    end

    [anki_file, file_name]
  end

  def create_csv_file
    anki_file = CSV_FILE

    CSV.open(anki_file, "w") do |csv|
      parsed_cards.each do |hash|
        csv << hash.values.reverse
      end
    end

    [anki_file, file_name]
  end

  private

  def parsed_cards
    json_cards = @deck.cards.to_json
    JSON.parse(json_cards).values
  end

  def file_name
    "#{@deck.name}.#{@format}"
  end
end
