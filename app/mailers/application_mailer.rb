class ApplicationMailer < ActionMailer::Base
  default from: "adrian.przychodzien@gmail.com"
  layout "mailer"

    # http://localhost:3000/rails/mailers/application_mailer/invitation_email.html
    def invitation_email
      @invitation = params[:invitation]
      mail(to: @invitation.email, subject: "Invitation to join #{@invitation.organization.name}")
    end
end
