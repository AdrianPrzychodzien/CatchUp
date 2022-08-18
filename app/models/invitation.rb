# == Schema Information
#
# Table name: invitations
#
#  id              :integer          not null, primary key
#  organization_id :integer          not null
#  teacher_id      :integer
#  token           :string
#  expire_at       :datetime
#  via             :string
#  status          :string
#  email           :string
#  batch_id        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  student_id      :integer
#  recipient_type  :string
#  group_id        :integer
#

class Invitation < ApplicationRecord
  include AASM

  belongs_to :organization
  belongs_to :teacher, optional: true
  belongs_to :student, optional: true

  validates :email, uniqueness: true, presence: true, format: Devise.email_regexp
  validates :token, uniqueness: true, presence: true

  before_validation :set_token, if: :new_record?
  before_validation :set_expire_at, if: :new_record?

  # has_many :groups

  scope :student_invitation, -> { where(recipient_type: "student") }

  aasm column: :status do
    state :pending, initial: true
    state :sent
    state :expired
    state :canceled
    state :fulfilled

    event :send_via_email do
      transitions from: :pending, to: :sent
    end

    event :realize do
      transitions from: [:pending, :sent], to: :fulfilled
    end
  end

  def send_invitation_email!
    ApplicationMailer.with(invitation: self).invitation_email.deliver_now
    send_via_email!
  end

  private

  def generate_token
    base_token = rand(36**8).to_s(36)
    # replace common mistakes in token by more readable chars
    base_token.gsub(/[O0o]/, "0").gsub(/[I1i]/, "1").gsub(/[Ll]/, "1").upcase
  end

  def set_token
    self.token = generate_token
  end

  def set_expire_at
    self.expire_at = Time.now + 1.month
  end
end
