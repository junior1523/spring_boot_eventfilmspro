package event.eventFilmsPro.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
@Entity
@Table(name = "contratos")
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "apellidos_nombres", nullable = false)
    private String apellidosNombres;

    private String dni;
    private String telefono;

    @Column(name = "tipo_evento_id")
    private Integer tipoEventoId;

    @Column(name = "tipo_evento_otro")
    private String tipoEventoOtro;

    @Column(name = "nombre_evento", nullable = false)
    private String nombreEvento;

    private String direccion;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "rango_filmacion", columnDefinition = "jsonb")
    private Object rangoFilmacion;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "plan_pagos", columnDefinition = "jsonb")
    private Object planPagos;

    private String observaciones;

    @Column(name = "estado")
    private String estado;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDate fechaCreacion = LocalDate.now();

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }
}
