import { commandList } from './../../factory/command.factory';
import { EntityRepository, Repository } from 'typeorm';

import { Command } from '@/interfaces/helper-interface/command-interface';
import { CommandEntity } from '@/entities/commands.entity';

@EntityRepository()
class CommandService extends Repository<CommandEntity> {
  constructor() {
    super();
    this.createBulk();
  }
  public async findAllCommand(): Promise<Command[]> {
    const commands: Command[] = await CommandEntity.find();
    return commands;
  }
  public async createBulk(): Promise<Command[]> {
    const commands: Command[] = await CommandEntity.find();
    if (commands.length === 0) {
      for (let i = 0; i < commandList.length; i++) {
        await this.createCommand(commandList[i]);
      }
    }
    return commands;
  }

  public async createCommand(commandData: any): Promise<any> {
    const createCommandData: any = await CommandEntity.create(commandData).save();

    return createCommandData;
  }
}

export default CommandService;
