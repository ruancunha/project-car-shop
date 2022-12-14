import { Request, Response, NextFunction } from 'express';
import { CarControllerInterface } from '../interfaces/CarControllerInterface';
import { CarServiceInterface } from '../interfaces/CarServiceInterface';
import CarService from '../services/car.service';

const ID_SIZE = { error: 'Id must have 24 hexadecimal characters' };
const NOT_FOUND = { error: 'Object not found' };

export default class CarController implements CarControllerInterface {
  private _carService: CarServiceInterface;

  constructor(carService: CarServiceInterface = new CarService()) {
    this._carService = carService;
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const { model, year, color, buyValue, doorsQty, seatsQty } = req.body;
      const carCreated = await this._carService
        .create({ model, year, color, buyValue, doorsQty, seatsQty });
      return res.status(201).json(carCreated);
    } catch (error) {
      next(error);
    }
  }

  async read(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const cars = await this._carService.read();
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }

  async readOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      if (id.length < 24) {
        return res
          .status(400)
          .json(ID_SIZE); 
      }
      const car = await this._carService.readOne(id);
      if (!car) return res.status(404).json(NOT_FOUND);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      if (id.length < 24) return res.status(400).json(ID_SIZE);
      if (!req.body) return res.status(400);
      const { model, year, color, buyValue, doorsQty, seatsQty } = req.body;
      const car = await this._carService
        .update(id, { model, year, color, buyValue, doorsQty, seatsQty });
      if (!car) return res.status(404).json(NOT_FOUND);
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const { id } = req.params;
      if (id.length < 24) {
        return res
          .status(400)
          .json(ID_SIZE); 
      }
      const car = await this._carService.delete(id);
      if (!car) return res.status(404).json(NOT_FOUND);
      return res.status(204).json(car);
    } catch (error) {
      next(error);
    }
  }
}
