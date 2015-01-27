require 'test_helper'

class LanguagesControllerTest < ActionController::TestCase
  test "should get lang" do
    get :lang
    assert_response :success
  end

end
