\connect recipebox;
SET ROLE chef;
SET SEARCH_PATH = kitchen;
SHOW search_path;


--DROP TABLE IF EXISTS quantities;
CREATE TABLE IF NOT EXISTS quantities(
    id                    SERIAL PRIMARY KEY,
    qty                   NUMERIC(6,3) UNIQUE,
    human_qty             VARCHAR(32)
);

--DROP TABLE IF EXISTS units;
CREATE TABLE IF NOT EXISTS units(
    id                    SERIAL PRIMARY KEY,
    unit_abbr_sng         VARCHAR(64),
    unit_abbr_pl          VARCHAR(64),
    unit_full_sng         VARCHAR(64),
    unit_full_pl          VARCHAR(64)
);

--DROP TABLE IF EXISTS measures;
CREATE TABLE IF NOT EXISTS measures(
    id                    SERIAL PRIMARY KEY,
    qty                   numeric(6,3) NOT NULL,
    human_qty             VARCHAR(32),
    unit_abbr_sng         VARCHAR(64),
    unit_abbr_pl          VARCHAR(64),
    unit_full_sng         VARCHAR(64),
    unit_full_pl          VARCHAR(64)
);


--DROP TABLE IF EXISTS ingredients;
CREATE TABLE IF NOT EXISTS ingredients(
    id                    SERIAL PRIMARY KEY,
    name                  text
    --purveyor_id           INT REFERENCES purveyors(id),
    --provenance            text,
    --fdcld                 Numeric(7,0),
    --categories            text[]
);
--insert into ingredients(ingredient) values('peanut butter');

--DROP TABLE IF EXISTS ingredient_rows;
CREATE TABLE IF NOT EXISTS  ingredient_rows(
    id                    SERIAL PRIMARY KEY,
    recipe_id             INTEGER,
    row_version           SMALLINT DEFAULT 1,
    measure_id            INTEGER REFERENCES measures (id),
    ingredient_id         INTEGER REFERENCES ingredients (id),
    position              SMALLINT,
    --grouping              INTEGER,
    prep_specifiers       text
    --CHECK (row_version is unique to recipe_id)
);

--DROP TABLE IF EXISTS instructions;
CREATE TABLE IF NOT EXISTS instructions(
    id                    SERIAL PRIMARY KEY,
    recipe_id             INTEGER,
    position              SMALLINT,
    --grouping_id           INTEGER,
    instruction           text
);

--DROP TABLE IF EXISTS recipe_metadata;
CREATE TABLE IF NOT EXISTS recipe_metadata(
    id                    SERIAL PRIMARY KEY,
    recipe_id             INTEGER,
    yield                 text,
    num_portions          smallint,
    --yeild_per_portion     GENERATED ALWAYS AS (km * 1.852) STORED,
    prep_time             text,
    cooking_time          text,
    wait_time             text
);

--DROP TABLE IF EXISTS header;
CREATE TABLE IF NOT EXISTS header(
    id                    SERIAL PRIMARY KEY,
    recipe_id             INTEGER,
    author                TEXT,
    byline                TEXT,
    attribution           TEXT,
    journal_entry         TEXT,
    created_on            timestamptz default now(),
    last_updated          timestamptz default now()
);


CREATE TABLE IF NOT EXISTS recipes(
    id                    SERIAL NOT NULL PRIMARY KEY,
    recipe_key            UUID DEFAULT gen_random_uuid(),
    name                  TEXT UNIQUE NOT NULL,
    iteration             INTEGER NOT NULL DEFAULT 1,
    current_version       INTEGER NOT NULL DEFAULT 1,
    description           TEXT,
    narrative             TEXT,
    metadata_id           INTEGER REFERENCES recipe_metadata (id),
    ingredient_row_id     INTEGER REFERENCES ingredient_rows (id),
    instruction_id        INTEGER REFERENCES instructions (id),
	  created_on            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


insert into measures(qty, unit_abbr_pl) values(3, 'pcs') returning *;
insert into ingredients(name) values('bread') returning *;

select current_user;
\dt;



