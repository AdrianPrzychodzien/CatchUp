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
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  belongs_to :organization
  belongs_to :invitation, optional: true

  has_many :students
  has_many :groups, through: :students
  has_many :decks

  has_one :manager, through: :organization

  attribute :token

  # FIXME: SUB-OPTIMAL for larges sets or generated token, will be ok upto 10000 pending invintations
  validates :token, presence: true, inclusion: {in: proc { Invitation.sent.pluck(:token) }}, on: :create

  before_validation :get_organization_id_from_invitation, on: :create
  after_create :set_invitation_status

  private

  def get_organization_id_from_invitation
    invitation = Invitation.find_by(token: token)
    self.organization_id = invitation.organization_id if invitation
  end

  def set_invitation_status
    invitation = Invitation.find_by(token: token)
    invitation.teacher = self
    invitation.realize
    invitation.save

    # invitation.groups.each do |group|
    #   groups << group
    # end
    save
  end
end
