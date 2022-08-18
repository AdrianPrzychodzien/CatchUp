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

require "test_helper"

class GroupTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
