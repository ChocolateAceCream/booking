class User
    include Mongoid::Document
    include ActiveModel::SecurePassword
    include ActiveModel::SecureToken
    include Mongoid::Timestamps

    field :name, type: String
    field :email, type: String
    field :password_digest, type: String
    field :token, type: String
    field :token_created_at, type: DateTime
    field :admin, type: Boolean

    has_many :reservations

    validates_presence_of :name, :email, :password
    validates_uniqueness_of :email
    validates_length_of :password, minimum: 6, maximum: 16
    has_secure_password
    has_secure_token

    def invalidate_token
        self.update(token: nil)
    end

    def self.valid_login?(email, password)
        user = find_by(email: email)
        if user && user.authenticate(password)
          user
        end
    end

    def self.valid_email?(name, email, password)
        user = find_by(email: email)
        if user == nil
            user = User.create(name: name, email: email, password: password)
            return user
        end

    end

    def allow_token_to_be_userd_only_once
        regenerate_token
        update_attribute(:token_created_at, Time.now)
    end

    def self.with_unexpired_token(token, period)
        where(token: token).where(:token_created_at.gte => period).first
    end

    def logout
        invalidate_token
    end

    def self.clear_all
        self.delete_all
    end

    private

    #this functionality is not available in has_secure_token
    def invalidate_token
        update_attribute(:token, nil)
        update_attribute(:token_created_at, Time.now)
    end
end
