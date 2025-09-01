class PricingController < ApplicationController
  def index
    @individual_price = Booking::INDIVIDUAL_PRICE
    @group_price = Booking::GROUP_PRICE_PER_PERSON
    @minimum_group = Booking::MINIMUM_GROUP_SIZE
    @subjects = Subject.all.group_by(&:category)
  end
end
