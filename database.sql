CREATE TABLE "koalas" (
	"id" serial primary key,
	"name" varchar(20) not null,
	"gender" varchar(10) not null,
	"age" integer not null,
	"ready_to_transfer" varchar(10) not null,
	"notes" varchar(100)
);
