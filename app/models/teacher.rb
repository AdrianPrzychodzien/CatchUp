# == Schema Information
#
# Table name: teachers
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  organization_id        :integer
#

class Teacher < ApplicationRecord
  include Invitable

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  belongs_to :organization
  belongs_to :invitation, optional: true

  has_many :students
  has_many :groups, through: :students
  has_many :decks

  has_one :manager, through: :organization
  has_many :invitations, -> { where(recipient_type: "student") }, through: :organization
end
