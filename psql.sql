CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_name TEXT NOT NULL
);

CREATE TABLE event_data (
    id PRIMARY KEY REFERENCES events(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    organizer TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    place TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    requirements TEXT NOT NULL,
    location_to_files TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE user_passwords (
    user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_password TEXT NOT NULL
);