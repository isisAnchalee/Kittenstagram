module Api
  class ApiController < ApplicationController
    before_action :require_signed_in!

    def require_feed_member!
      redirect_to new_session_url unless current_feed.is_member?(current_user)
    end
  end
end
