package sq.walking.skeleton.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

public class RelocationRequestDTO {

    private String name;
    private String email;
    private String phone;
    private String pickupAddress;
    private String deliveryAddress;
    private LocalDate movingDate;
    private int floor;
    private boolean terms;
    private String truckType;
    private boolean elevator;
    private String note;

    public RelocationRequestDTO() {}

    public RelocationRequestDTO(String name, String email, String phone, String pickupAddress, String deliveryAddress, LocalDate movingDate, int floor, boolean terms, String truckType, boolean elevator, String note) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.pickupAddress = pickupAddress;
        this.deliveryAddress = deliveryAddress;
        this.movingDate = movingDate;
        this.floor = floor;
        this.terms = terms;
        this.truckType = truckType;
        this.elevator = elevator;
        this.note = note;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPickupAddress() {
        return pickupAddress;
    }

    public void setPickupAddress(String pickupAddress) {
        this.pickupAddress = pickupAddress;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public LocalDate getMovingDate() {
        return movingDate;
    }

    public void setMovingDate(LocalDate movingDate) {
        this.movingDate = movingDate;
    }

    public int getFloor() {
        return floor;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public boolean isTerms() {
        return terms;
    }

    public void setTerms(boolean terms) {
        this.terms = terms;
    }

    public String getTruckType() {
        return truckType;
    }

    public void setTruckType(String truckType) {
        this.truckType = truckType;
    }

    public boolean isElevator() {
        return elevator;
    }

    public void setElevator(boolean elevator) {
        this.elevator = elevator;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
