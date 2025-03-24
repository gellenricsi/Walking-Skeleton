package sq.walking.skeleton;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.Mockito.when;

/**
 * Test class for MoveController.
 */
public class MoveControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MovementService movementService;

    private RelocationRequestDTO relocationRequestDTO;

    /**
     * Setup method to initialize the test data before each test.
     */
    @BeforeEach
    public void setup() {
        relocationRequestDTO = new RelocationRequestDTO("John", "Doe", "2025-05-10", "123 Street", "456 Avenue", true, "2", true);
    }

    /**
     * Test for successfully handling a relocation request.
     */
    @Test
    public void testRequestForRelocationSupport_Success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/movement")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"firstName\": \"John\", \"lastName\": \"Doe\", \"movingDate\": \"2025-05-10\", \"pickupAddress\": \"123 Street\", \"deliveryAddress\": \"456 Avenue\", \"elevator\": true, \"floor\": \"2\", \"packingService\": true }"))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Request received successfully"));
    }

    /**
     * Test for handling a failed relocation request due to missing required fields.
     */
    @Test
    public void testRequestForRelocationSupport_Failure() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/movement")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{ \"firstName\": \"\", \"lastName\": \"\", \"movingDate\": \"\", \"pickupAddress\": \"\", \"deliveryAddress\": \"\", \"elevator\": false, \"floor\": \"\", \"packingService\": false }"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
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
                        .content("{ \"firstName\": \"John\", \"lastName\": \"Doe\", \"movingDate\": \"2025-05-10\", \"pickupAddress\": \"123 Street\", \"deliveryAddress\": \"456 Avenue\", \"elevator\": true, \"floor\": \"2\", \"packingService\": true }"))
                .andExpect(MockMvcResultMatchers.status().isInternalServerError())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Error processing request"));
    }
}
