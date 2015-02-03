class AccountActivationsController < ApplicationController


  def edit
    
    email = params[:email]
    activation_token = params[:id]

    @user = User.find_by(email: email)  

    attribute = "activation"

    if @user && @user.authenticated?(attribute, activation_token)
      @user.activate
      @message = "Your account has been activated. Please enter your password."
    else
      @message = "Your account was not activated... Sorry :("
    end

  end


  #I should update the password in the database and redirect to the index admin page for the user. 
  def update    

    par = params

    id = params[:id]    
    password_params = { :password => params[:user][:password], :password_confirmation => params[:user][:password_confirmation] }

    @user = User.find_by(id: id)

    if @user
      debugger
      if @user.set_password(password_params)
        flash[:notice] = "Your password was successfully set!"
        redirect_to static_pages_index_admin_url
      else
        render 'edit'
      end
    else
      render 'edit'
    end

    debugger

  end



end
