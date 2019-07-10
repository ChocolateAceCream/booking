=begin
class ReservationBroadcastJob < ApplicationJob
    queue_as :default

    def perform(reservations)
        ActionCable.server.broadcast('reservations',reservations)
    end
end
=end
