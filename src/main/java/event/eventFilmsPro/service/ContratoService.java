package event.eventFilmsPro.service;

import event.eventFilmsPro.model.Contrato;
import event.eventFilmsPro.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;

    public List<Contrato> listarTodos() {
        return contratoRepository.findAll();
    }

    public Optional<Contrato> buscarPorId(Long id) {
        return contratoRepository.findById(id);
    }

    public Contrato guardar(Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    public void eliminar(Long id) {
        contratoRepository.deleteById(id);
    }
}
