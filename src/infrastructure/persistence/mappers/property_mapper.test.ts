import { v4 as uuidv4 } from "uuid";
import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

it("deve converter PropertyEntity em Property corretamente", () => {
  const uuid = uuidv4();
  const entity = new PropertyEntity();
  entity.id = uuid;
  entity.name = "Casa de praia";
  entity.description = "Casa de praia com piscina";
  entity.maxGuests = 10;
  entity.basePricePerNight = 100;
  entity.maxGuests = 10;

  const property = PropertyMapper.toDomain(entity);

  expect(property.getId()).toBe(uuid);
  expect(property.getName()).toBe("Casa de praia");
  expect(property.getDescription()).toBe("Casa de praia com piscina");
  expect(property.getMaxGuests()).toBe(10);
  expect(property.getBasePricePerNight()).toBe(100);
  expect(property.getMaxGuests()).toBe(10);
});

it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
  const entity = new PropertyEntity();
  entity.id = uuidv4();

  expect(() => PropertyMapper.toDomain(entity)).toThrow("O nome é obrigatório");
});

it("deve converter Property para PropertyEntity corretamente", () => {
  const property = new Property(
    uuidv4(),
    "Casa de praia",
    "Casa de praia com piscina",
    10,
    100
  );

  const entity = PropertyMapper.toPersistence(property);

  expect(entity.id).toBe(property.getId());
  expect(entity.name).toBe(property.getName());
  expect(entity.description).toBe(property.getDescription());
  expect(entity.maxGuests).toBe(property.getMaxGuests());
  expect(entity.basePricePerNight).toBe(property.getBasePricePerNight());
});
