# == Schema Information
#
# Table name: organizations
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Organization < ApplicationRecord
  has_many :groups, dependent: :destroy
  # has_many :teachers, dependent: :destroy
  # has_many :employees, dependent: :destroy

  validates :name, presence: true
end
