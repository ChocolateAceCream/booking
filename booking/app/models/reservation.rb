class Reservation
    include Mongoid::Document
    field :name, type: String
    field :seat, type: String
    field :date, type: Date
    #minimum duration is 1 (day)
    field :duration, type: Integer

    belongs_to :user

    def self.new_reservation(name, seat, date, duration)
        date = Date.parse(date)
        p name
        reservation = Reservation.create(name: name, seat: seat, date: date, duration: duration)
        return reservation

    end

    def self.all_reservations
        return Reservation.collection.find().to_json
    end

    def self.clear_all
        self.delete_all
    end

    after_save { ReservationBroadcastJob.perform_later(Reservation.collection.find().to_json)}
    #after_save {ActionCable.server.broadcast('reservation',Reservation.collection.find().to_json) }

end
