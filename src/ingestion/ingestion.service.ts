import { Injectable } from '@nestjs/common';

@Injectable()
export class IngestionService {
  async startIngestion() {
    // Simulate ingestion process, you can connect to a Python service here
    console.log('Ingestion process started...');
    return { message: 'Ingestion started' };
  }

  async stopIngestion() {
    // Simulate stopping ingestion process
    console.log('Ingestion process stopped...');
    return { message: 'Ingestion stopped' };
  }
}
