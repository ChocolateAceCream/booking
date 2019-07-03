class Reservation
  include Mongoid::Document
  field :seat, type: String
  field :start, type: Date
  field :duration, type: Integer

  embedded_in :user

  def self.new_reservation(seat,start,duration)
      reservation = Reservation.new(seat: seat, start: start, duration: duration)
  end
end
