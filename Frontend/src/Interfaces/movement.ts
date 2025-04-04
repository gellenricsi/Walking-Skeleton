export interface Movement {
  id: string;
  name: string;
  email: string;
  phone: string;
  pickupAddress: string;
  deliveryAddress: string;
  movingDate: string;
  floor: string;
  terms: boolean;
  truckType: string;
  elevator: boolean;
  note: string;
}

export interface MovementCreateRequest {
  name: string;
  email: string;
  phone: string;
  pickupAddress: string;
  deliveryAddress: string;
  movingDate: string;
  floor: string;
  terms: boolean;
  truckType: string;
  elevator: boolean;
  note: string;
}
