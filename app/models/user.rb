class User < ActiveRecord::Base

  #we create a class attribute called activation_token. This attribute will not be saved to the database, it is 
  #just the not hashed version of the one that will be saved, called activation_digest
  attr_accessor :activation_token, :password_reset_token


  before_create :create_activation_digest

  has_secure_password

  validates :password, length: { minimum: 6 }



  # Returns the hash digest of the given string.
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  # Returns a random token.
  def User.new_token
    SecureRandom.urlsafe_base64
  end


  #functions that checkes whether the attribute_digest exists in the database, and whether it has the same value as the token 
  #we give as a parameter. 
  def authenticated? attribute, token
    digest = self.send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end

  def activate 
    update_attribute(:activated, true)
    update_attribute(:activated_at, Time.zone.now)
  end


  #function that updates the database column for the password. As an argument i give a hash that contains the password
  #and password_confirmation.
  def set_password password_params
    update_attributes(password_params)
  end


  private

    #create a new random string, hash it
    def create_activation_digest
      self.activation_token = User.new_token
      self.activation_digest = User.digest(activation_token)
    end

    def create_password_digest
      self.password_reset_token = User.new_token
      self.password_reset_digest = User.digest(password_reset_token)
    end


end
