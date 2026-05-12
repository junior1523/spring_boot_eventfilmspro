-- ══════════════════════════════════════════════════════════════════════════════
-- EventFilms — PostgreSQL Schema v2.0
-- Use: psql -d eventfilms -f schema.sql
-- ══════════════════════════════════════════════════════════════════════════════

-- ── TIPOS ENUM ────────────────────────────────────────────────────────────────
CREATE TYPE estado_evento        AS ENUM ('Sin Iniciar', 'En Proceso', 'Revisión', 'Completado', 'Entregado');
CREATE TYPE prioridad_tipo       AS ENUM ('Alta', 'Media', 'Baja');
CREATE TYPE trailer_estado       AS ENUM ('Listo', 'Proceso', 'No iniciado');
CREATE TYPE entrega_medio        AS ENUM ('USB', 'DVD', 'BLURAY', 'OTROS');
CREATE TYPE estado_entrega_final AS ENUM ('Listo', 'En proceso', 'No iniciado', 'Otros');
CREATE TYPE estado_contrato      AS ENUM ('Activo', 'Pendiente', 'Completado', 'Cancelado');
CREATE TYPE tipo_pago            AS ENUM ('Anticipo', 'Pago Parcial', 'Pago Final');
CREATE TYPE metodo_pago          AS ENUM ('Efectivo', 'Transferencia', 'Tarjeta');
CREATE TYPE estado_pago          AS ENUM ('Pagado', 'Pendiente', 'Vencido');
CREATE TYPE rol_usuario          AS ENUM ('Administrador', 'Personal');

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLAS CATÁLOGO (sin dependencias)
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS tipo_evento (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    activo      BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

INSERT INTO tipo_evento (nombre) VALUES
('Boda'),
('Evento Corporativo'),
('Evento Social'),
('Quinceañero'),
('Bautizo'),
('Graduación'),
('Otro');

-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS clientes (
    id         SERIAL PRIMARY KEY,
    nombre     VARCHAR(255) NOT NULL,
    tipo       VARCHAR(255) NOT NULL,
    email      VARCHAR(255),
    telefono   VARCHAR(255),
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS editores (
    id           SERIAL PRIMARY KEY,
    nombre       VARCHAR(255) NOT NULL,
    email        VARCHAR(255),
    telefono     VARCHAR(255),
    especialidad VARCHAR(255),
    activo       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS almacenamientos (
    id            SERIAL PRIMARY KEY,
    nombre        VARCHAR(255) NOT NULL,
    tamano        VARCHAR(255) NOT NULL,
    condiciones   VARCHAR(255) NOT NULL,
    ubicacion     VARCHAR(255),
    activo        BOOLEAN      NOT NULL DEFAULT TRUE,
    observaciones TEXT,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS personal_total (
    id                SERIAL PRIMARY KEY,
    nombres           VARCHAR(255) NOT NULL,
    apellidos         VARCHAR(255) NOT NULL,
    edad              INT,
    dni               VARCHAR(20),
    telefono          VARCHAR(50),
    direccion         VARCHAR(255),
    fecha_nacimiento  DATE,
    especialidades    JSONB,
    adicional         TEXT,
    rol               VARCHAR(50),
    email             VARCHAR(255),
    disponibilidad    VARCHAR(50),
    eventos_asignados INT          NOT NULL DEFAULT 0,
    calificacion      NUMERIC(3,2) NOT NULL DEFAULT 0.0,
    created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS usuarios (
    id                 SERIAL PRIMARY KEY,
    nombre             VARCHAR(255) NOT NULL,
    apellidos          VARCHAR(255) NOT NULL,
    email              VARCHAR(255) NOT NULL UNIQUE,
    password_hash      TEXT         NOT NULL,
    rol                rol_usuario  NOT NULL DEFAULT 'Personal',
    activo             BOOLEAN      NOT NULL DEFAULT TRUE,
    ultimo_acceso      TIMESTAMPTZ,
    token_reset        TEXT,
    token_reset_expira TIMESTAMPTZ,
    created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLAS CON DEPENDENCIAS
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS contratos (
    id                 SERIAL PRIMARY KEY,
    apellidos_nombres  VARCHAR(255)    NOT NULL,
    dni                VARCHAR(20),
    telefono           VARCHAR(50),
    tipo_evento_id     INT             REFERENCES tipo_evento(id) ON DELETE RESTRICT,
    tipo_evento_otro   VARCHAR(255),
    nombre_evento      VARCHAR(255)    NOT NULL,
    direccion          VARCHAR(255),
    fecha_inicio       DATE,
    fecha_fin          DATE,
    rango_filmacion    JSONB,
    plan_pagos         JSONB,
    observaciones      TEXT,
    estado             estado_contrato NOT NULL DEFAULT 'Pendiente',
    fecha_creacion     DATE            NOT NULL DEFAULT CURRENT_DATE,
    created_at         TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS eventos (
    id                         SERIAL PRIMARY KEY,
    nombre                     VARCHAR(255)         NOT NULL,
    cliente_id                 INT                  REFERENCES clientes(id)    ON DELETE SET NULL,
    tipo_evento_id             INT                  REFERENCES tipo_evento(id) ON DELETE RESTRICT,
    lugar                      VARCHAR(255)         NOT NULL,
    fecha_inicio               DATE                 NOT NULL,
    fecha_entrega              DATE                 NOT NULL,
    duracion_estimada          VARCHAR(255),
    estado                     estado_evento        NOT NULL DEFAULT 'Sin Iniciar',
    prioridad                  prioridad_tipo       NOT NULL DEFAULT 'Media',
    editor_id                  INT                  REFERENCES editores(id)    ON DELETE SET NULL,
    progreso                   SMALLINT             NOT NULL DEFAULT 0 CHECK (progreso BETWEEN 0 AND 100),
    archivo_nombre             VARCHAR(255),
    datos_adicionales          TEXT,
    revision_audio             BOOLEAN              NOT NULL DEFAULT FALSE,
    revision_color             BOOLEAN              NOT NULL DEFAULT FALSE,
    revision_final             BOOLEAN              NOT NULL DEFAULT FALSE,
    fecha_edicion_inicio       DATE,
    fecha_edicion_fin          DATE,
    capitulos                  INT                  NOT NULL DEFAULT 0,
    tiempo_total_horas         INT                  NOT NULL DEFAULT 0,
    tiempo_total_minutos       INT                  NOT NULL DEFAULT 0 CHECK (tiempo_total_minutos BETWEEN 0 AND 59),
    trailer_estado             trailer_estado       NOT NULL DEFAULT 'No iniciado',
    fotos_bruto_cantidad       INT                  NOT NULL DEFAULT 0,
    fotos_bruto_formato        VARCHAR(255),
    fotos_editadas_cantidad    INT                  NOT NULL DEFAULT 0,
    fotos_editadas_listas      BOOLEAN              NOT NULL DEFAULT FALSE,
    fotos_editadas_formato     VARCHAR(255),
    observaciones              TEXT,
    entrega_medio              entrega_medio        NOT NULL DEFAULT 'USB',
    usb_size                   VARCHAR(255),
    usb_cantidad               INT                  NOT NULL DEFAULT 0,
    dvd_count                  INT                  NOT NULL DEFAULT 0,
    bluray_count               INT                  NOT NULL DEFAULT 0,
    otros_entrega              VARCHAR(255),
    estado_entrega_final       estado_entrega_final NOT NULL DEFAULT 'En proceso',
    estado_entrega_final_otros VARCHAR(255),
    created_at                 TIMESTAMPTZ          NOT NULL DEFAULT NOW(),
    updated_at                 TIMESTAMPTZ          NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS material_audiovisual (
    id         SERIAL PRIMARY KEY,
    evento_id  INT         NOT NULL REFERENCES eventos(id) ON DELETE CASCADE,
    capitulos  JSONB,
    fotos      TEXT,
    links      JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS pagos (
    id                SERIAL PRIMARY KEY,
    contrato_id       INT           REFERENCES contratos(id) ON DELETE SET NULL,
    cliente           VARCHAR(255),
    evento            VARCHAR(255),
    monto             NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    tipo              tipo_pago     NOT NULL,
    metodo            metodo_pago   NOT NULL,
    fecha             DATE          NOT NULL DEFAULT CURRENT_DATE,
    estado            estado_pago   NOT NULL DEFAULT 'Pendiente',
    fecha_vencimiento DATE,
    observaciones     TEXT,
    created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS evento_almacenamiento (
    id                SERIAL PRIMARY KEY,
    evento_id         INT         NOT NULL REFERENCES eventos(id)         ON DELETE CASCADE,
    almacenamiento_id INT         NOT NULL REFERENCES almacenamientos(id) ON DELETE RESTRICT,
    fecha_asignacion  DATE        NOT NULL DEFAULT CURRENT_DATE,
    notas             TEXT,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (evento_id, almacenamiento_id)
);

-- ══════════════════════════════════════════════════════════════════════════════
-- ÍNDICES
-- ══════════════════════════════════════════════════════════════════════════════

CREATE INDEX idx_eventos_cliente_id                        ON eventos(cliente_id);
CREATE INDEX idx_eventos_editor_id                         ON eventos(editor_id);
CREATE INDEX idx_eventos_tipo_evento_id                    ON eventos(tipo_evento_id);
CREATE INDEX idx_eventos_estado                            ON eventos(estado);
CREATE INDEX idx_eventos_prioridad                         ON eventos(prioridad);
CREATE INDEX idx_eventos_fecha_entrega                     ON eventos(fecha_entrega);
CREATE INDEX idx_contratos_tipo_evento_id                  ON contratos(tipo_evento_id);
CREATE INDEX idx_contratos_estado                          ON contratos(estado);
CREATE INDEX idx_pagos_contrato_id                         ON pagos(contrato_id);
CREATE INDEX idx_pagos_estado                              ON pagos(estado);
CREATE INDEX idx_pagos_fecha_vencimiento                   ON pagos(fecha_vencimiento);
CREATE INDEX idx_material_audiovisual_evento_id            ON material_audiovisual(evento_id);
CREATE INDEX idx_evento_almacenamiento_evento_id           ON evento_almacenamiento(evento_id);
CREATE INDEX idx_evento_almacenamiento_almacenamiento_id   ON evento_almacenamiento(almacenamiento_id);
CREATE INDEX idx_personal_total_rol                        ON personal_total(rol);
CREATE INDEX idx_usuarios_email                            ON usuarios(email);
CREATE INDEX idx_usuarios_rol                              ON usuarios(rol);

-- ══════════════════════════════════════════════════════════════════════════════
-- VISTA GENERAL DE EVENTOS
-- ══════════════════════════════════════════════════════════════════════════════

CREATE VIEW vw_evento_detalles AS
SELECT
    e.id                       AS evento_id,
    e.nombre                   AS evento_nombre,
    c.nombre                   AS cliente_nombre,
    te.nombre                  AS tipo_evento,
    e.lugar,
    e.fecha_inicio,
    e.fecha_entrega,
    e.estado,
    e.prioridad,
    ed.nombre                  AS editor_nombre,
    e.progreso,
    e.revision_audio,
    e.revision_color,
    e.revision_final,
    e.fecha_edicion_inicio,
    e.fecha_edicion_fin,
    e.capitulos,
    e.tiempo_total_horas,
    e.tiempo_total_minutos,
    e.trailer_estado,
    e.fotos_bruto_cantidad,
    e.fotos_editadas_cantidad,
    e.fotos_editadas_listas,
    e.entrega_medio,
    e.usb_cantidad,
    e.dvd_count,
    e.bluray_count,
    e.estado_entrega_final,
    e.created_at
FROM eventos e
LEFT JOIN clientes   c  ON c.id  = e.cliente_id
LEFT JOIN tipo_evento te ON te.id = e.tipo_evento_id
LEFT JOIN editores   ed ON ed.id = e.editor_id;

-- ══════════════════════════════════════════════════════════════════════════════
-- ROL Y PERMISOS
-- ══════════════════════════════════════════════════════════════════════════════

DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'web_anon') THEN
    CREATE ROLE web_anon NOLOGIN;
  END IF;
END
$$;

GRANT USAGE  ON SCHEMA public TO web_anon;
GRANT SELECT ON ALL TABLES    IN SCHEMA public TO web_anon;
GRANT USAGE  ON ALL SEQUENCES IN SCHEMA public TO web_anon;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES    TO web_anon;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE  ON SEQUENCES TO web_anon;
