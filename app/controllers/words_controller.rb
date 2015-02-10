class WordsController < ApplicationController
  
  def main  
    @words_english = Word.where("lang = ?", 0)
    @words_macedonian = Word.where("lang = ?", 1)
  end

end
