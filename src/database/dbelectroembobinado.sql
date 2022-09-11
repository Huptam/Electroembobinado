create database electroembobinado;
use electroembobinado;
create table Direccion(
    Codigo int not null auto_increment,
    Municipio varchar(40) not null,
    Barrio varchar(40) not null,
    Carrera int(15),
    Calle int(15),
    primary key (Codigo)
);
create table Empleado(
    Cedula int(13) not null,
    Nombre varchar(25) not null,
    Nombre2 varchar(25) not null,
    Apellido_1 varchar(25) not null,
    Apellido_2 varchar(25),
    Telefono bigint(13) not null,
    Fecha_nacimiento date not null,
    Estado_civil varchar(25) not null,
    id_direccion int not null,
    primary key (Cedula),
    foreign key (id_direccion) references Direccion(Codigo));


create table usuarios(
    id int auto_increment not null,
    password  varchar(100) not null,
    fecha_registro date not null,
    usuario int(13) not null,
    primary key (id),
    foreign key (usuario) references Empleado(cedula)
);

create table Roles(
    codigo_rol int auto_increment,
    Nombre varchar(45) not null,
    Descripcion varchar(145) not null,
    primary key (codigo_rol)
);

create table Roles_usuario(
    cod_user int not null auto_increment,
    id_rol int not null,
    id_usuario int not null,
    primary key (cod_user),
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_rol) references Roles(codigo_rol)
);

create table Tipodemotor(
    id_tipo INT auto_increment NOT NULL,
    Nombre varchar(45) not null,
    Descripcion VARCHAR(45) NOT NULL,
    activo TINYINT NOT null,
    PRIMARY key (id_tipo) 
);



create table Cliente(
    identificacion int(13) not null,
    Nombre varchar(25) not null,
    Apellidos VARCHAR(45) NOT NULL,
    Telefono BIGINT(13) NOT NULL,
    direccion INT  NOT NULL,
    PRIMARY KEY (identificacion),
     foreign key (direccion) references Direccion(Codigo)
);

create table Embobinado(
    Cod_embobinado INT auto_increment NOT NULL,
    Num_campo int  not null,
    Num_subobina INT  NOT NULL,
    Num_canto INT NOT NULL,
    Calibre_alambre INT NOT NULL,
    Ranura_por_medio INT  NOT NULL,
    Peso_alambre INT  NOT NULL,
    Num_vuelta INT NOT NULL,
    Tipo_campo VARCHAR(45) NOT NULL,
    PRIMARY KEY (Cod_embobinado)
);

create table Motor(
    Codigo_Motor INT auto_increment NOT NULL,
    id_bobina int  not null,
    id_cliente INT(13) NOT NULL,
    Tipo_de_motor INT NOT NULL,
    Marca varchar(45) not null,
    Modelo varchar(45) not null,
    Ph INT  NOT NULL,
    Hp INT  NOT NULL,
    Ranuras INT NOT NULL,
    Voltaje INT NOT NULL,
    Fecha_ingreso DATE NOT NULL,
    Descripcion VARCHAR(255) NOT NULL,
    primary key (Codigo_Motor),
    foreign key (id_bobina) references Embobinado(Cod_embobinado),
    foreign key (id_cliente) references Cliente(identificacion),
    foreign key (Tipo_de_motor) references Tipodemotor(id_tipo)
);

create table Reparacion(
    Codigo_rep int auto_increment not null,
    id_empleado int not null,
    id_motor  int not null,
    descripcion VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    Esquema VARCHAR(200) NOT NULL,
    PRIMARY KEY (Codigo_rep),
    foreign key (id_empleado) references Empleado(Cedula),
    foreign key (id_motor) references Motor(Codigo_Motor)
);

CREATE TABLE Piezas(
    Codigo INT auto_increment NOT NULL,
    Nombre varchar(60) NOT NULL,
    Cantidad INT NOT NULL,
    Categoria VARCHAR(45) NOT NULL,
    Stock VARCHAR(45) NOT NULL,
    Valor_unitario VARCHAR(45) NOT NULL,
    Valor_costo VARCHAR(45) NOT NULL,
    Valor_parcial_costo VARCHAR(45) NOT NULL,
    Valor_parcial_unitario VARCHAR(45) NOT NULL,
    Utilidad VARCHAR(45) NOT NULL,
    PRIMARY KEY (Codigo)
);

create table Piezas_Usadas(
    Codigo_piezas int not null,
    id_repacion int not null,
    foreign key (Codigo_piezas) references Piezas(Codigo),
    foreign key (id_repacion) references Reparacion(Codigo_rep)
);

INSERT INTO `roles` (`codigo_rol`, `Nombre`, `Descripcion`) VALUES (NULL, 'Administrador', 'administrar la informacion del sistema'), (NULL, 'Empleado', 'ejecuta las tareas de reparación asignadas');
INSERT INTO `direccion` (`Codigo`, `Municipio`, `Barrio`, `Carrera`, `Calle`) VALUES (NULL, 'Lorica', 'San vicente', '13', '8'), (NULL, 'Cerete', 'Venus', '12', '3');
INSERT INTO `direccion` (`Codigo`, `Municipio`, `Barrio`, `Carrera`, `Calle`) VALUES (NULL, 'Lorica', 'El progreso', '13', '8'), (NULL, 'San antero', 'la pradera', '12', '3');
INSERT INTO `empleado` (`Cedula`, `Nombre`, `Nombre2`, `Apellido_1`, `Apellido_2`, `Telefono`, `Fecha_nacimiento`, `Estado_civil`, `id_direccion`) VALUES ('8765345', 'Jose', 'Miguel', 'Ramos', 'Martinez', '3007658917', '1995-12-09', 'soltero', '1'), ('2647899', 'Andres', 'Felipe', 'Arias', 'Arias', '3134567822', '1990-05-27', 'casado', '2');
INSERT INTO `usuarios` (`id`, `password`, `fecha_registro`, `usuario`) VALUES (NULL, '$2a$05$9M9W6XQeEqMRxvjx0WSR/uQxGwviU1eiUwmZLVipmp/iZWm4yLheu', '2020-05-07', '2647899');
INSERT INTO `roles_usuario` (`cod_user`, `id_rol`, `id_usuario`) VALUES ('1', '1', '1');
INSERT INTO `cliente` (`identificacion`, `Nombre`, `Apellidos`, `Telefono`, `direccion`) VALUES ('126754', 'Ivan', 'Andres Gonzales', '3207654321', '3');
INSERT INTO `embobinado` (`Cod_embobinado`, `Num_campo`, `Num_subobina`, `Num_canto`, `Calibre_alambre`, `Ranura_por_medio`, `Peso_alambre`, `Num_vuelta`, `Tipo_campo`) VALUES (NULL, '13', '4', '56', '3', '82', '37', '66', 'igual tamaño');
INSERT INTO `tipodemotor` (`id_tipo`, `Nombre`, `Descripcion`, `activo`) VALUES (NULL, 'Motor trfasico', 'motor de tres fases ', '1'), (NULL, 'Motor monofasico', 'dsysgaifiahiuh', '1');
INSERT INTO `motor` (`Codigo_Motor`, `id_bobina`, `id_cliente`, `Tipo_de_motor`, `Marca`, `Modelo`, `Ph`, `Hp`, `Ranuras`, `Voltaje`, `Fecha_ingreso`, `Descripcion`) VALUES (NULL, '1', '126754', '2', 'hdjy', '2193-machine', '23', '1850', '36', '1450', '2020-05-04', 'presenta fallas al encender');