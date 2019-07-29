class ReservationBroadcastJob < ApplicationJob
    queue_as :default
    def perform(reservations)
        ActionCable.server.broadcast('reservation',reservations)
    end
end
