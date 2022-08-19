# == Schema Information
#
# Table name: students
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  provider               :string
#  uid                    :string
#  teacher_id             :integer
#  group_id               :integer
#  organization_id        :integer
#

class Student < ApplicationRecord
  include Invitable

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable,
    :omniauthable,
    omniauth_providers: %i[facebook]

  validates :email, presence: true, uniqueness: true

  belongs_to :organization
  belongs_to :teacher, optional: true
  belongs_to :group, optional: true

  has_many :refresh_tokens, dependent: :delete_all

  def self.from_omniauth(auth)
    student = Student.where(email: auth.info.email).first

    student ||= Student.create!(
      provider: auth.provider,
      uid: auth.uid,
      email: auth.info.email,
      password: Devise.friendly_token[0, 20]
    )
    student
  end
end
