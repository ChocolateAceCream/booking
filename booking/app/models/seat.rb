class Seat
    include Mongoid::Document
    field :name, type: String
    field :date, type: Hash, default: {}

    def self.valid?(user,seat, date,duration)
        p user+seat
        p date
        p duration
        seat = find_by(name: seat)
        date = Date.parse(date)
        if seat
            temp = seat.date
            duration =duration.to_i
            booked = []
            (0..duration-1).each do |i|
                str = (date+i) #str is Date object
                if temp[str.to_s]
                    booked << str
                end
            end

            if booked.empty?
                (0..duration-1).each do |i|
                    str = date+i
                    temp[str.to_s] = 1
                end
                seat.update(:name=> seat.name,:date => temp)
                return "booked"
            end
            return booked
        end
        return false
    end

    def self.clear_all
        self.delete_all
        (1..10).each do |i|
            k=i.to_s
            Seat.create(name: "A"+k)
            Seat.create(name: "B"+k)
            Seat.create(name: "C"+k)
        end
    end
end
