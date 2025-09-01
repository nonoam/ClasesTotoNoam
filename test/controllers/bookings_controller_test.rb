require "test_helper"

class BookingsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get bookings_new_url
    assert_response :success
  end

  test "should get create" do
    get bookings_create_url
    assert_response :success
  end

  test "should get show" do
    get bookings_show_url
    assert_response :success
  end

  test "should get confirm" do
    get bookings_confirm_url
    assert_response :success
  end

  test "should get cancel" do
    get bookings_cancel_url
    assert_response :success
  end

  test "should get check_availability" do
    get bookings_check_availability_url
    assert_response :success
  end
end
