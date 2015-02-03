class UsersController < ApplicationController

  before_filter :set_host_from_request, only: [:create]

  def index

    @users = User.all



  end

  def new
    @user = User.new
  end


  def create
    @user = User.new(user_params)
    @user.password = "matej123"    
    #debugger
    if @user.save  
      SignUpMailer.sample_email(@user).deliver
      flash[:notice] = "An email was sent to the entered address. Check email for activation link."
      redirect_to root_url
    else
      render 'users/new'
    end
    
  end  

  private 

    def user_params
      params.require(:user).permit(:name, :surname, :email, :username)
    end

    def set_host_from_request
      ActionMailer::Base.default_url_options = { host: request.host_with_port }
    end

end
