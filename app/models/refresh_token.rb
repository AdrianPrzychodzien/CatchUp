# == Schema Information
#
# Table name: refresh_tokens
#
#  id            :integer          not null, primary key
#  crypted_token :string
#  student_id    :integer          not null
#  expires_at    :datetime         not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class RefreshToken < ApplicationRecord
  belongs_to :student
  before_create :set_crypted_token

  attr_accessor :token

  def self.find_by_token(token)
    return unless token.present?
    
    crypted_token = Digest::SHA256.hexdigest token
    RefreshToken.find_by(crypted_token: crypted_token)
  end

  def is_valid?
    valid = Time.now < expires_at

    if valid
      update(expires_at: Time.now + 1.day)
    else
      destroy
    end

    valid
  end

  private

  def set_crypted_token
    self.token = SecureRandom.hex
    self.crypted_token = Digest::SHA256.hexdigest(token)
  end
end
