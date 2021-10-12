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