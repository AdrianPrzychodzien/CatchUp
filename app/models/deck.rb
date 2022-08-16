# == Schema Information
#
# Table name: decks
#
#  id         :integer          not null, primary key
#  teacher_id :integer
#  name       :string
#  cards      :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Deck < ApplicationRecord
  belongs_to :teacher
end
