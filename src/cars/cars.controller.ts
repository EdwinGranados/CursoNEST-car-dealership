import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto ,UpdateCarDto} from './dto';


@Controller('cars')
//@UsePipes(ValidationPipe) pipe a nivel se controller
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id',ParseUUIDPipe) id: string) {
    return this.carsService.findByID(id);
  }

  @Post()
  //@UsePipes(ValidationPipe) pipe a nivel de metodo
  registerCar(@Body() createDto: CreateCarDto) {
    return this.carsService.create(createDto);
  }

  @Patch(':id')
  updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id,updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.delete(id)
  }
}
