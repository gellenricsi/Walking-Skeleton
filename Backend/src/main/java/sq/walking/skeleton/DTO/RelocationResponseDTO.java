package sq.walking.skeleton.DTO;

import sq.walking.skeleton.Entities.RequestRelocation;

import java.time.LocalDate;

public class RelocationResponseDTO {

    private long id;
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

    public RelocationResponseDTO() {}

    public RelocationResponseDTO(RequestRelocation request) {
        this.id = request.getId();
        this.name = request.getName();
        this.email = request.getEmail();
        this.phone = request.getPhone();
        this.pickupAddress = request.getPickupAddress();
        this.deliveryAddress = request.getDeliveryAddress();
        this.movingDate = request.getMovingDate();
        this.floor = request.getFloor();
        this.terms = request.isTerms();
        this.truckType = request.getTruckType();
        this.elevator = request.isElevator();
        this.note = request.getNote();
    }

    public RelocationResponseDTO(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
