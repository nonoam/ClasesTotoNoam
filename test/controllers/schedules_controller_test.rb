require "test_helper"

class SchedulesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get schedules_index_url
    assert_response :success
  end

  test "should get availability" do
    get schedules_availability_url
    assert_response :success
  end
end
