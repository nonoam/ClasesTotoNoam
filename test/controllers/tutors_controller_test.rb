require "test_helper"

class TutorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get tutors_index_url
    assert_response :success
  end

  test "should get show" do
    get tutors_show_url
    assert_response :success
  end

  test "should get experience" do
    get tutors_experience_url
    assert_response :success
  end
end
