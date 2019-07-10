class ReservationChannel < ApplicationCable::Channel
    def subscribed
        stream_from 'reservation'
    end
end
