import { Model } from '../interfaces/ModelInterface';
import { CarServiceInterface } from '../interfaces/CarServiceInterface';
import { Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/car.model';

export default class CarService implements CarServiceInterface {
  private _carModel: Model<Car>;

  constructor(carModel: Model<Car> = new CarModel()) {
    this._carModel = carModel;
  }

  async create(car: Car): Promise<Car> {
    CarSchema.parse(car);
    const carCreated = await this._carModel.create(car);
    return carCreated;
  }
  
  async read(): Promise<Car[] | null> {
    const cars = await this._carModel.read();
    return cars;
  }

  async readOne(id: string): Promise<Car | null> {
    const car = await this._carModel.readOne(id);
    return car;
  }

  async update(id: string, car: Car): Promise<Car | null> {
    CarSchema.parse(car);
    const result = await this._carModel.update(id, car);
    return result;
  }

  async delete(id: string): Promise<Car | null> {
    const car = await this._carModel.delete(id);
    return car;
  }
}