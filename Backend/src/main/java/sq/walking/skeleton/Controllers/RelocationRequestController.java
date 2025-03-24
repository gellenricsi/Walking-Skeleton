package sq.walking.skeleton.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sq.walking.skeleton.DTO.RelocationRequestDTO;
import sq.walking.skeleton.DTO.RelocationResponseDTO;
import sq.walking.skeleton.Entities.RequestRelocation;
import sq.walking.skeleton.Services.RelocationRequestService;

@RestController
@RequestMapping("/movement")
public class RelocationRequestController {

    private final RelocationRequestService relocationRequestService;

    @Autowired
    public RelocationRequestController(RelocationRequestService relocationRequestService) {
        this.relocationRequestService = relocationRequestService;
    }

    @PostMapping
    public ResponseEntity<RelocationResponseDTO> requestForRelocationSupport(@RequestBody RelocationRequestDTO relocationRequestDTO) {
        try {
            RequestRelocation requestRelocation = relocationRequestService.requestForRelocationSupport(relocationRequestDTO);

            return new ResponseEntity<>(new RelocationResponseDTO(requestRelocation), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
