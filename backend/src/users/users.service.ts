import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const usersCacheKey = 'users';
    const cachedUsers: User[] | undefined =
      await this.cacheManager.get(usersCacheKey);

    if (cachedUsers) {
      return cachedUsers;
    }

    await sleep(3000);

    const users = this.userRepository.find();

    await this.cacheManager.set(usersCacheKey, users, 1000 * 10);
    return users;
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, user);
    await this.cacheManager.clear();
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
    await this.cacheManager.clear();
  }
}
