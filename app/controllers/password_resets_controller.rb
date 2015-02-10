class PasswordResetsController < ApplicationController
  
  before_filter :set_host_from_request, only: [:check_email]

  def new

  end

  def check_email
    email = params[:email]

    @user = User.find_by(email: email)

    #if the user exists then we should create reset_password_digest for him and send an email to his address
    if @user     
      #we create a password token and then hash it and save it in the database. 
      @user.create_password_digest
      PasswordResetMailer.password_reset_mail(@user).deliver
      json = { 'success' => true }     
    else
      json = { 'success' => false }
    end

    respond_to do |format|
      format.json { render json: json }
    end

  end

  #this function is invoked when the user clicks on the link in the mail. It should validate the user from the email address
  #received in the params, and then compare the token with its hashed version in the database. 
  def edit

    email = params[:email]
    token = params[:id]

    attribute = "reset_password"

    @user = User.find_by(email: email)
    
    if !(@user && @user.authenticated?(attribute, token))
      @alert_message = "Your password was NOT reset, authentication failed."
      redirect_to login_new_path
    end

  end

  #we update the password in the database. If all is good we should LOG the user IN, and then redirect to the 
  #index admin page. 
  def update

    id = params[:id]    
    password_params = { :password => params[:user][:password], :password_confirmation => params[:user][:password_confirmation] }

    @user = User.find_by(id: id)

    if @user      
      if @user.set_password(password_params)
        log_in @user
        flash[:notice] = "Your password was successfully set!"
        redirect_to static_pages_index_admin_url
      else
        render 'edit'
      end
    else
      render 'edit'
    end  

  end


  private 


    def set_host_from_request
      ActionMailer::Base.default_url_options = { host: request.host_with_port }
    end

end
