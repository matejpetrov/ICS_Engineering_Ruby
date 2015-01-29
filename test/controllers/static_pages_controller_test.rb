require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get index_admin" do
    get :index_admin
    assert_response :success
  end

end
