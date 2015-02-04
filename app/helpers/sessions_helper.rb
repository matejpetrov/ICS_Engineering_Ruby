module SessionsHelper


  def log_in user

    session[:user_id] = user.id

  end


  def current_user
    user_id = session[:user_id]
    @current_user = @current_user || User.find_by(id: user_id)
  end


  def log_out
    session.delete(:user_id)
    @current_user = nil
  end

  def logged_in?
    user_id = session[:user_id]

    @current_user ||= User.find_by(id: user_id)

    if @current_user
      return true
    else
      return false
    end

  end


end
