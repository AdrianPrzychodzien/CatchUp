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

require "test_helper"

class StudentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
