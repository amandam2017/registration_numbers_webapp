create table towns(
    id serial not null primary key,
    town_names text not null,
    string_starts_with text not null
);

create table registrations(
    id serial not null primary key,
    entered_regs text not null,
    towns_id int not null,
    foreign key(towns_id) references towns(id)
);

INSERT INTO towns(town_names, string_starts_with) VALUES('Cape Town', 'CA');
INSERT INTO towns(town_names, string_starts_with) VALUES('Malmesbury', 'CK');
INSERT INTO towns(town_names, string_starts_with) VALUES('Stellenbosch', 'CL');

-- added foreign key referencing the town table