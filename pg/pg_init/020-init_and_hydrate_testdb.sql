\connect test;
SET ROLE taster;
SHOW search_path;

CREATE TABLE sanity(
    id serial NOT NULL,
    uuid UUID DEFAULT gen_random_uuid(),
    marco varchar(4) NOT NULL DEFAULT 'POLO',
    hello_world text NOT NULL DEFAULT ROW (
            CONCAT(E'\u4f60', E'\u597d', E'\uff0c', E'\u4e16', E'\u754c'),
            CONCAT('Jag kan ocks', E'\u00E5', ' k', E'\u00f6', 'pa ost'),
            'こんにちは 世界'
        ),
    PRIMARY KEY(id)
);

INSERT INTO sanity DEFAULT VALUES RETURNING *;
