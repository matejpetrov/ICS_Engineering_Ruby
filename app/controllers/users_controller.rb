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


  def edit

    #should get the id of the current user. 

  end

  def destroy

    @json = { 'success' => "Success!" }


    id = params[:id]

    @user = User.find_by(id: id)    

    respond_to do |format|

      if @user.destroy
        format.json { render json: @json }
      else

      end

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
