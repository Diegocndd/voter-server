CREATE TABLE user(
    id_user INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    birth DATE NOT NULL,
    password VARCHAR(12) NOT NULL,
    logged BIT NOT NULL,
    token VARCHAR(50),
    PRIMARY KEY (id_user)
);

CREATE TABLE poll(
    id_poll INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(70),
    qty_options INT NOT NULL,
    public BIT NOT NULL,
    type_exhibition VARCHAR(50) NOT NULL,
    limit_date DATE,
    PRIMARY KEY (id_poll)
);

CREATE TABLE alternative(
    id_alternative INT NOT NULL AUTO_INCREMENT,
    id_poll INT,
    description VARCHAR(255) NOT NULL,
    qty_votes INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id_alternative),
    FOREIGN KEY (id_poll) REFERENCES poll(id_poll)
);