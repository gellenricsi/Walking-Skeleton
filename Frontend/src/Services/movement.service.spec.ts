import { TestBed } from '@angular/core/testing';

import { MovementService } from './movement.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovementCreateRequest } from '../Interfaces/movement';

describe('MovementService', () => {
  let service: MovementService;
  let httpTestingController: HttpTestingController;

  // Set up the test environment before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovementService],
    });

    service = TestBed.inject(MovementService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // Ensure no outstanding HTTP requests remain after each test
  afterEach(() => {
    httpTestingController.verify();
  });

  // Test if the service is created successfully
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test the createMovement method to ensure it sends a POST request with the correct data
  it('should send a POST request to create a movement', () => {
    const dummyMovement: MovementCreateRequest = {
      name: 'John Wick',
      email: 'john@wick.com',
      phone: '06308792592',
      pickupAddress: '123 Street',
      deliveryAddress: '456 Avenue',
      movingDate: '2025-05-10',
      floor: '3',
      terms: true,
      note: 'note',
      elevator: true,
      truckType: 'Xl',
    };

    // Call the createMovement method and subscribe to its response
    service.createMovement(dummyMovement).subscribe((response) => {
      expect(response).toEqual(dummyMovement); // Ensure the response matches the mock data
    });

    // Expect a single HTTP request to the API URL
    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyMovement);

    req.flush(dummyMovement);
  });
});
