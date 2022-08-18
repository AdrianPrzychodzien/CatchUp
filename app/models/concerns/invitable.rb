module Invitable
    extend ActiveSupport::Concern
   
    included do
        attribute :token

        # FIXME: SUB-OPTIMAL for larges sets or generated token, will be ok upto 10000 pending invintations
        validates :token, presence: true, inclusion: {in: proc { Invitation.sent.pluck(:token) }}, on: :create
        
        before_validation :get_data_from_invitation, on: :create
        after_create :set_invitation_status
    end
   
    private

    def get_data_from_invitation
      invitation = Invitation.find_by(token: token)
      self.organization_id = invitation.organization_id if invitation

      if invitation.recipient_type == 'student'
        self.teacher_id = invitation.teacher_id
        self.group_id = invitation.group_id if invitation
      end
    end
  
    def set_invitation_status
      invitation = Invitation.find_by(token: token)
      invitation.teacher = self if invitation.recipient_type == 'teacher'
      invitation.student = self if invitation.recipient_type == 'student'
      invitation.realize
      invitation.save
      save
    end
end
