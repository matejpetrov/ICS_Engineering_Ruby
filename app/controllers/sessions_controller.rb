class SessionsController < ApplicationController

  def new

  end

  def create

    username = params[:session][:username]
    password = params[:session][:password]

    user = User.find_by(username: username)    

    if user && user.authenticate(password)

      if user.activated
        log_in user
        @current_user = user
        sess = session[:user_id]        
        redirect_to static_pages_index_admin_url
      else 
        message = "The account is not activated. Please check your email"

        flash[:warning] = message
        redirect_to root_url
      end

    else

      flash.now[:danger] = "Invalid username/password combination"
      render 'new'

    end

  end

  def destroy

    log_out if logged_in?
    redirect_to root_url

  end


end
