class UsersController < ApplicationController

  before_filter :set_host_from_request, only: [:create]

  def index
    @users = User.all
  end

  def new
    @user = User.new

    @roles = [['Super User', 1], ['Normal User', 2]]

  end


  def create
    
    hash = { :role => params[:role] }

    hash = hash.merge(user_params)
    @user = User.new(hash)
    @user.password = "matej123"    
    
    if @user.save  
      SignUpMailer.sample_email(@user).deliver
      flash[:notice] = "An email was sent to the entered address. Check email for activation link."
      redirect_to root_url
    else
      render 'users/new'
    end
    
  end  


  def edit

    @user = User.find_by(id: current_user.id)

    if !@user
      redirect_to root_url    
    end

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


  def verify_old_password

    password = params[:password]

    user = current_user

    if user && user.authenticate(password)
      @json = { 'success' => true }      
    else
      @json = { 'success' => false }
    end

    respond_to do |format|
      format.json { render json: @json }
    end

  end


  #function that checks whether a user with username received in the params exists in the database. If so, 
  #it returns true, otherwise false. 
  def check_username
    
    username = params[:username]

    

    respond_to do |format|  

      if User.exists?(:username => username)
        @json = { 'result' => 'true', 'data' => 'The entered username is ' + username }        
      else
        @json = { 'result' => 'false', 'data' => 'You entered poorly' }
      end

      format.json { render json: @json }

    end    

  end

  private 

    def user_params
      params.require(:user).permit(:name, :surname, :email, :username, :role)
    end

    def set_host_from_request
      ActionMailer::Base.default_url_options = { host: request.host_with_port }
    end

end
