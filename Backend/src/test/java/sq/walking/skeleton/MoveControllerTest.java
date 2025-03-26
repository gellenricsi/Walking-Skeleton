package sq.walking.skeleton;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import sq.walking.skeleton.Controllers.RelocationRequestController;
import sq.walking.skeleton.DTO.RelocationRequestDTO;
import sq.walking.skeleton.DTO.RelocationResponseDTO;
import sq.walking.skeleton.Entities.RequestRelocation;
import sq.walking.skeleton.Services.RelocationRequestService;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Test class for MoveController.
 */
public class MoveControllerTest {

    @Mock
    private RelocationRequestService movementService;

    @InjectMocks
    private RelocationRequestController controller;

    /**
     * Initializes mocks before each test.
     */
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test for successfully handling a relocation request.
     */
    @Test
    public void testRequestForRelocationSupport_Success(){

        RequestRelocation requestRelocation = new RequestRelocation(
                "John Doe",
                "john@john.at",
                "06308792592",
                "123 Street",
                "456 Avenue",
                LocalDate.parse("2025-05-10"),
                2,
                true,
                "Xl",
                true,
                ""
        );

        RelocationRequestDTO relocationRequestDTO = new RelocationRequestDTO(
                "John Doe",
                "john@john.at",
                "06308792592",
                "123 Street",
                "456 Avenue",
                LocalDate.parse("2025-05-10"),
                2,
                true,
                "Xl",
                true,
                ""
        );

        requestRelocation.setId(Long.parseLong("10"));

        when(movementService.requestForRelocationSupport(relocationRequestDTO))
                .thenReturn(requestRelocation);

        ResponseEntity<RelocationResponseDTO> response = controller.requestForRelocationSupport(relocationRequestDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("John Doe", response.getBody().getName());
        assertEquals("john@john.at", response.getBody().getEmail());
    }

    /**
     * Test for handling an internal server error scenario due to a database connection issue.
     */
    @Test
    public void testRequestForRelocationSupport_InternalServerError() {
        RelocationRequestDTO relocationRequestDTO = new RelocationRequestDTO(
                "John Doe",
                "john@john.at",
                "06308792592",
                "123 Street",
                "456 Avenue",
                LocalDate.parse("2025-05-10"),
                2,
                true,
                "Xl",
                true,
                ""
        );

        when(movementService.requestForRelocationSupport(relocationRequestDTO)).thenThrow(new RuntimeException("Internal Server Error"));

        ResponseEntity<RelocationResponseDTO> response = controller.requestForRelocationSupport(relocationRequestDTO);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertNull(response.getBody());

        verify(movementService, times(1)).requestForRelocationSupport(relocationRequestDTO);
    }
}
