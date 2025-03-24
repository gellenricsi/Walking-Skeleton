package sq.walking.skeleton;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import sq.walking.skeleton.DTO.RelocationRequestDTO;
import sq.walking.skeleton.Entities.RequestRelocation;
import sq.walking.skeleton.Repositroies.RequestRelocationRepository;
import sq.walking.skeleton.Services.RelocationRequestService;

import java.time.LocalDate;

import static org.mockito.Mockito.*;

/**
 * Test class for MovementService.
 */
public class MovementServiceTest {

    @Mock
    private RequestRelocationRepository requestRelocationRepository;

    @InjectMocks
    private RelocationRequestService movementService;

    private RelocationRequestDTO relocationRequestDTO;

    /**
     * Setup method to initialize mocks and test data before each test.
     */
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        relocationRequestDTO = new RelocationRequestDTO("John Doe", "john@john.at", "06308792592", "123 Street", "456 Avenue", LocalDate.parse("2025-05-10"),2, true, "2nd", true,"");
    }

    /**
     * Test for successfully handling a relocation request.
     */
    @Test
    public void testRequestForRelocationSupport_Success() {
        RequestRelocation requestRelocation = new RequestRelocation(
                "John Doe", "john@john.at", "06308792592", "123 Street", "456 Avenue",
                LocalDate.parse("2025-05-10"), 2, true, "2nd", true, ""
        );

        when(requestRelocationRepository.save(Mockito.any(RequestRelocation.class))).thenReturn(requestRelocation);

        movementService.requestForRelocationSupport(relocationRequestDTO);

        verify(requestRelocationRepository, times(1)).save(Mockito.any(RequestRelocation.class));
    }

    /**
     * Test for handling an internal server error due to a database issue.
     */
    @Test
    public void testRequestForRelocationSupport_InternalServerError() {
        when(requestRelocationRepository.save(Mockito.any(RequestRelocation.class)))
                .thenThrow(new RuntimeException("Database connection error"));

        try {
            movementService.requestForRelocationSupport(relocationRequestDTO);
        } catch (Exception e) {
            assert e instanceof RuntimeException;
        }
    }
}
