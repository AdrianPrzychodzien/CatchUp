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

require "test_helper"

class RefreshTokenTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
