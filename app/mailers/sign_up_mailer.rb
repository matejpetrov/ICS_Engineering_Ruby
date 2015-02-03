class SignUpMailer < ApplicationMailer

  default from: "from@example.com"

  def sample_email(user)
    #method mail sends email to the given address
    @user = user
    mail(to: @user.email, subject: 'Sample Email')

  end

end
