class PasswordResetsController < ApplicationController
  

  def new

  end

  def check_email
    email = params[:email]

    @user = User.find_by(email: email)

    #if the user exists then we should create reset_password_digest for him and send an email to his address
    if @user     
      #we create a password token and then hash it and save it in the database. 
      @user.create_password_digest
      PasswordResetMailer.password_reset_mail(@user)
      json = { 'success' => true }     
    else
      json = { 'success' => false }
    end

    respond_to do |format|
      format.json { render json: json }
    end


  end


  #this function is invoked after the user 
  def update

    id = params[:id]    
    password_params = { :password => params[:user][:password], :password_confirmation => params[:user][:password_confirmation] }

    @user = User.find_by(id: id)

    if @user      
      if @user.set_password(password_params)
        flash[:notice] = "Your password was successfully set!"
        redirect_to static_pages_index_admin_url
      else
        render 'edit'
      end
    else
      render 'edit'
    end  

  end

end
