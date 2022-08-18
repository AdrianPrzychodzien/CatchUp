# == Schema Information
#
# Table name: groups
#
#  id              :integer          not null, primary key
#  organization_id :integer          not null
#  teacher_id      :integer
#  name            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  language        :integer          default("0")
#  level           :integer          default("0")
#

class Group < ApplicationRecord
  enum language: {EN: 0, PL: 1, FR: 2}
  enum level: {A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5}

  validates :level, inclusion: {in: levels.keys}
  validates :language, inclusion: {in: languages.keys}

  belongs_to :organization
  belongs_to :teacher
  has_many :students
  # has_many :lessons, through: :students

  before_save :set_name

  before_destroy :destroy_students_fk

  def destroy_students_fk
    students.each do |student|
      student.update(group_id: nil)
    end
  end

  def set_name
    self.name = "#{organization.name}_#{language}_#{level}".upcase
  end
end
