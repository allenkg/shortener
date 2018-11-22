collection @trackers

attributes: :id,
    :created_at,
    :link_id,
    :user_id,
    :location
child(:user) { attributes :email }
child(:links) { attributes :short_link }

