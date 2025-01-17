import { v4 as uuidv4 } from "uuid";
import { BookingEntity } from "../entities/booking_entity";
import { BookingMapper } from "./booking_mapper";
import { PropertyEntity } from "../entities/property_entity";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { UserEntity } from "../entities/user_entity";
import { DateRange } from "../../../domain/value_objects/date_range";
import { Booking } from "../../../domain/entities/booking";

it("deve converter BookingEntity em Booking corretamente", () => {
  const uuid = uuidv4();
  const propertyEntity = new PropertyEntity();
  propertyEntity.id = uuid;
  propertyEntity.name = "Casa de praia";
  propertyEntity.description = "Casa de praia com piscina";
  propertyEntity.maxGuests = 10;
  propertyEntity.basePricePerNight = 100;
  propertyEntity.maxGuests = 10;

  const userEntity = new UserEntity();
  userEntity.id = uuid;
  userEntity.name = "John Doe";

  const bookingEntity = new BookingEntity();
  bookingEntity.id = uuid;
  bookingEntity.property = propertyEntity;
  bookingEntity.guest = userEntity;
  bookingEntity.startDate = new Date();
  bookingEntity.endDate = new Date();
  bookingEntity.guestCount = 2;
  bookingEntity.totalPrice = 100;
  bookingEntity.status = "CONFIRMED";

  const booking = BookingMapper.toDomain(bookingEntity);

  expect(booking.getId()).toBe(uuid);
  expect(booking.getProperty()).toBeInstanceOf(Property);
  expect(booking.getGuest()).toBeInstanceOf(User);
  expect(booking.getDateRange()).toBeInstanceOf(DateRange);
  expect(booking.getGuestCount()).toBe(2);
  expect(booking.getTotalPrice()).toBe(100);
  expect(booking.getStatus()).toBe("CONFIRMED");
});

it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
  const uuid = uuidv4();
  const propertyEntity = new PropertyEntity();
  propertyEntity.id = uuid;
  propertyEntity.name = "Casa de praia";
  propertyEntity.description = "Casa de praia com piscina";
  propertyEntity.maxGuests = 10;
  propertyEntity.basePricePerNight = 100;
  propertyEntity.maxGuests = 10;

  const userEntity = new UserEntity();
  userEntity.id = uuid;
  userEntity.name = "John Doe";

  const bookingEntity = new BookingEntity();
  bookingEntity.id = uuid;
  bookingEntity.property = propertyEntity;
  bookingEntity.guest = userEntity;
  bookingEntity.startDate = new Date();
  bookingEntity.endDate = new Date();
  bookingEntity.guestCount = -1;
  bookingEntity.totalPrice = 100;
  bookingEntity.status = "CONFIRMED";

  expect(() => BookingMapper.toDomain(bookingEntity)).toThrow(
    "O número de hóspedes deve ser maior que zero."
  );
});

it("deve converter Booking para BookingEntity corretamente", () => {
  const uuid = uuidv4();
  const property = new Property(
    uuid,
    "Casa de praia",
    "Casa de praia com piscina",
    10,
    100
  );
  const user = new User(uuid, "John Doe");
  const dateRange = new DateRange(
    new Date("2024-12-10"),
    new Date("2024-12-12")
  );
  const booking = new Booking(uuid, property, user, dateRange, 2);

  const bookingEntity = BookingMapper.toPersistence(booking);

  expect(bookingEntity.id).toBe(uuid);
  expect(bookingEntity.property).toBeInstanceOf(PropertyEntity);
  expect(bookingEntity.guest).toBeInstanceOf(UserEntity);
  expect(bookingEntity.startDate).toEqual(dateRange.getStartDate());
  expect(bookingEntity.endDate).toEqual(dateRange.getEndDate());
  expect(bookingEntity.guestCount).toBe(2);
  expect(bookingEntity.totalPrice).toBe(200);
  expect(bookingEntity.status).toBe("CONFIRMED");
});
