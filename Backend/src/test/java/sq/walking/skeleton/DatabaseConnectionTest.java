package sq.walking.skeleton;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Tests the database connection established by the DataSource.
 */
@SpringBootTest
public class DatabaseConnectionTest {

    /**
     * The DataSource to be used for obtaining database connections.
     */
    @Autowired
    private DataSource dataSource;

    /**
     * Verifies that a connection to the database can be established.
     * This test attempts to get a connection from the DataSource and asserts that
     * the connection is not null. If successful, it prints the name of the database product.
     * If the connection fails, an exception is thrown.
     */
    @Test
    public void testDatabaseConnection() {
        try(Connection connection = dataSource.getConnection()) {
            assertNotNull(connection, "Connection should not be null");
            System.out.println("Database connected successfully: " + connection.getMetaData().getDatabaseProductName());
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to connect to database: ", e);
        }
    }
}
