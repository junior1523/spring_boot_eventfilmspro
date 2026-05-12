package event.eventFilmsPro.controller;

import event.eventFilmsPro.model.Contrato;
import event.eventFilmsPro.service.ContratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @GetMapping
    public List<Contrato> listar() {
        return contratoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contrato> buscar(@PathVariable Long id) {
        return contratoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Contrato crear(@RequestBody Contrato contrato) {
        return contratoService.guardar(contrato);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contrato> actualizar(@PathVariable Long id, @RequestBody Contrato contratoDetails) {
        return contratoService.buscarPorId(id)
                .map(contrato -> {
                    contrato.setApellidosNombres(contratoDetails.getApellidosNombres());
                    contrato.setDni(contratoDetails.getDni());
                    contrato.setTelefono(contratoDetails.getTelefono());
                    contrato.setTipoEventoId(contratoDetails.getTipoEventoId());
                    contrato.setTipoEventoOtro(contratoDetails.getTipoEventoOtro());
                    contrato.setNombreEvento(contratoDetails.getNombreEvento());
                    contrato.setDireccion(contratoDetails.getDireccion());
                    contrato.setFechaInicio(contratoDetails.getFechaInicio());
                    contrato.setFechaFin(contratoDetails.getFechaFin());
                    contrato.setRangoFilmacion(contratoDetails.getRangoFilmacion());
                    contrato.setPlanPagos(contratoDetails.getPlanPagos());
                    contrato.setObservaciones(contratoDetails.getObservaciones());
                    contrato.setEstado(contratoDetails.getEstado());
                    return ResponseEntity.ok(contratoService.guardar(contrato));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        contratoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
