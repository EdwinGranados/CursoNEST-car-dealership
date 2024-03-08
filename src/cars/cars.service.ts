import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  findAll() {
    return this.cars;
  }

  findByID(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`car con id '${id}' no encontrado`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const carCreated: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(carCreated);

    return carCreated;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carBD = this.findByID(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carBD = { ...carBD, ...updateCarDto, id };
        return carBD;
      }

      return car;
    });

    return carBD;
  }

  delete(id: string) {
    const car = this.findByID(id);
    console.log(car);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
