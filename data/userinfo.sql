DROP TABLE
IF EXISTS public.userinfo;

CREATE TABLE public.userinfo (
	ID SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR (100) NOT NULL,
	password VARCHAR (100) NOT NULL,
	email VARCHAR (100) NOT NULL,
	telephone VARCHAR (100) NOT NULL
);
--表说明
COMMENT ON TABLE public.userinfo IS '用户表';
--字段说明
COMMENT ON COLUMN public.userinfo.ID IS '主键ID';
COMMENT ON COLUMN public.userinfo.username IS '用户ID';
COMMENT ON COLUMN public.userinfo.password IS '用户名';
COMMENT ON COLUMN public.userinfo.email IS '用户电子邮箱';
COMMENT ON COLUMN public.userinfo.telephone IS '用户手机号码';