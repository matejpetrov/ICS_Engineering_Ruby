class LanguagesController < ApplicationController  

  before_action :set_locale, only: [ :lang ]
 

  def lang    
    flash[:notice] = "This is the notice"
  end


  def ajax
    Rails.logger.info params

    data = params[:data_to_send]

    respond_to do |format|
      
      format.html {  }
      @json = "{ back : #{data} }"      

      format.json { @json }
    end    

  end


  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end




end
