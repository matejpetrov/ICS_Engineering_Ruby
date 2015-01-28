class LanguagesController < ApplicationController  

  before_action :set_locale, only: [ :lang ]
  respond_to :html, :xml, :json
 

  def lang    
    flash[:notice] = "This is the notice"
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




end
