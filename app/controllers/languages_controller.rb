class LanguagesController < ApplicationController  

  before_action :set_locale, only: [ :lang ]
  respond_to :html, :xml, :json
 

  def lang 
    flash[:notice] = "This is the notice"
    @env = Rails.env
    @address = "No address yet"
  end


  def ajax
    
    Rails.logger.info params

    data = params[:data_to_send] 

    @json = { 'back' => "This is new data. " + data }
    
    respond_to do |format|
      format.json { render json: @json }    
    end

    #ERROR: Nil location provided. Can't build URI. This error is shown because the respond_with, tries to determine a URL to use from 
    #the location header setting, but can't figure out one. 
    
    #respond_with @json 

    #render @json
    
    #render :nothing => true      

  end


  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end


  def send_email

    @address = "petrov_matej@yahoo.com"    
    @email_settings = YAML::load(File.open("#{Rails.root.to_s}/config/email.yml"))

    SignUpMailer.sample_email(@address).deliver

    
    
  end




end
