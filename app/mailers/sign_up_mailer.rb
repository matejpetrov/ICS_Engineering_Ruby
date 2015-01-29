class SignUpMailer < ApplicationMailer

  default from: "from@example.com"

  def sample_email(address)
    #method mail sends email to the given address
    mail(to: address, subject: 'Sample Email')

  end

end
