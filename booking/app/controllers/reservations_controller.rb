class ReservationsController < ApiController
	before_action :require_login, :current_user

	def index
        all_reservations = Reservation.all_reservations()
		render json: all_reservations
    end

	def create
		check = Seat.valid?(
			params[:seat],
			params[:start],
			params[:duration]
		)
		if check == "booked"
			reservation = Reservation.new_reservation(
				@current_user.name,
				params[:seat],
				params[:start],
				params[:duration]
			)
			@current_user.reservations << reservation
            head :ok
		elsif check != false
			errors = { errors: [{detail: check.to_s+" has been booked"}]}
			render json: errors, status: :unbooked
		else
			errors = { errors: [{detail: "seat named "+params[:seat]+" has been found "}]}
			render json: errors, status: :wrong_seat
		end
	end
end
