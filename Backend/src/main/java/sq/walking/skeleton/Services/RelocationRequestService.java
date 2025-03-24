package sq.walking.skeleton.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sq.walking.skeleton.DTO.RelocationRequestDTO;
import sq.walking.skeleton.Entities.RequestRelocation;
import sq.walking.skeleton.Repositroies.RequestRelocationRepository;

@Service
public class RelocationRequestService {

    private final RequestRelocationRepository requestRelocationRepository;

    @Autowired
    public RelocationRequestService(RequestRelocationRepository requestRelocationRepository) {
        this.requestRelocationRepository = requestRelocationRepository;
    }

    public RequestRelocation requestForRelocationSupport(RelocationRequestDTO relocationRequestDTO) {
        RequestRelocation requestRelocation = new RequestRelocation(
                relocationRequestDTO.getName(),
                relocationRequestDTO.getEmail(),
                relocationRequestDTO.getPhone(),
                relocationRequestDTO.getPickupAddress(),
                relocationRequestDTO.getDeliveryAddress(),
                relocationRequestDTO.getMovingDate(),
                relocationRequestDTO.getFloor(),
                relocationRequestDTO.isTerms(),
                relocationRequestDTO.getTruckType(),
                relocationRequestDTO.isElevator(),
                relocationRequestDTO.getNote()
        );

        return requestRelocationRepository.save(requestRelocation);
    }
}
