class Teacher::CreateAnkiFileService
  def initialize(deck)
    @deck = deck
  end

  def call
    json_cards = @deck.cards.to_json

    parsed_cards = JSON.parse(json_cards).values

    anki_file = "anki.txt"

    File.open(anki_file, "w") do |file|
      parsed_cards.each do |card|
        front = card["front"]
        back = card["back"]
        file.write("#{front}; #{back}\n")
      end
    end

    anki_file
  end
end
