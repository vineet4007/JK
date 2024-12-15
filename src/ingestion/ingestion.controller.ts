import { Controller, Post } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('start')
  async startIngestion() {
    return this.ingestionService.startIngestion();
  }

  @Post('stop')
  async stopIngestion() {
    return this.ingestionService.stopIngestion();
  }
}
