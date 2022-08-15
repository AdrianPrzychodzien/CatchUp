# == Schema Information
#
# Table name: groups
#
#  id              :integer          not null, primary key
#  organization_id :integer          not null
#  teacher_id      :integer
#  name            :string
#  language        :string
#  level           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Group < ApplicationRecord
    belongs_to :organization
    belongs_to :teacher
    has_many :students
    # has_many :lessons, through: :students

    before_save :set_name

    def set_name
        self.name = "#{self.organization.name}_#{self.language}_#{self.level}".upcase
    end
end
