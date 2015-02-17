class WordsController < ApplicationController
  
  def main  
    @words_english = Word.where("lang = ?", 0)
    @words_macedonian = Word.where("lang = ?", 1)
  end

  def add_words

    words = params[:words]    
    lang = params[:lang]

    words_db = []
    
    if lang == "en"
      lang_db = 0
    else
      lang_db = 1
    end

    date = Time.now

    words.each do |w|
      new_word_db = "(#{lang_db}, '#{w}', '#{date}', '#{date}')"
      words_db.push new_word_db
    end

    sql = "INSERT INTO words (lang, word_name, created_at, updated_at) VALUES #{words_db.join(", ")}"

    #because we use the insert method as a result in records_array we will have the ID of the last word that 
    #was inserted.
    records_array = ActiveRecord::Base.connection.insert(sql)

    if records_array
      @all_words = Word.where("lang = ?", lang_db)

      @json = { "result" => true, "content" => @all_words, "lang" => lang_db }

    else
      @json = { "result" => false }
    end 

    respond_to do |format|
      format.json { render json: @json }
    end

  end


  def delete_words

    #this is an array that contains the ids of the words that need to be deleted
    words_to_delete = params[:words]    

    #the method returns the number of affected rows
    deletion_result = Word.delete_all(["id IN (?)", words_to_delete])

    @json = {}

    if deletion_result > 0
      @json = { "result" => true }
    else
      @json = { "result" => false }
    end    

    respond_to do |format|

      format.json { render json: @json }

    end

  end


end
