class PasswordResetMailer < ApplicationMailer

  default from: "from@example.com"

  def password_reset_mail(user)
    #method mail sends email to the given address
    @user = user
    mail(to: @user.email, subject: 'Sample Email')

  end

end
