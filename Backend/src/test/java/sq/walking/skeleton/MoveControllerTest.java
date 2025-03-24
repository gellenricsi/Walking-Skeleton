package sq.walking.skeleton;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import sq.walking.skeleton.DTO.RelocationRequestDTO;
import sq.walking.skeleton.Entities.RequestRelocation;
import sq.walking.skeleton.Services.RelocationRequestService;

import java.time.LocalDate;

import static org.mockito.Mockito.when;

/**
 * Test class for MoveController.
 */
@SpringBootTest
@AutoConfigureMockMvc
public class MoveControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RelocationRequestService movementService;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Test for successfully handling a relocation request.
     */
    @Test
    public void testRequestForRelocationSupport_Success() throws Exception {

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

        when(movementService.requestForRelocationSupport(relocationRequestDTO))
                .thenReturn(requestRelocation);

        mockMvc.perform(MockMvcRequestBuilders.post("/movement")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(relocationRequestDTO)))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    /**
     * Test for handling an internal server error scenario due to a database connection issue.
     */
    @Test
    public void testRequestForRelocationSupport_InternalServerError() throws Exception {
        when(movementService.requestForRelocationSupport(Mockito.any(RelocationRequestDTO.class)))
                .thenThrow(new RuntimeException("Database connection error"));

        mockMvc.perform(MockMvcRequestBuilders.post("/movement")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"name\": \"John Doe\", \"email\": \"john@john.at\", \"phone\": \"06308792592\", \"pickupAddress\": \"123 Street\", \"deliveryAddress\": \"456 Avenue\", \"movingDate\": \"2026-05-10\", \"floor\": 2, \"terms\": true, \"truckType\": \"Xl\", \"elevator\": true, \"note\": \"\" }"))
                .andExpect(MockMvcResultMatchers.status().isInternalServerError());
    }
}
