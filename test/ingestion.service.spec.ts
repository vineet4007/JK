import { Test, TestingModule } from '@nestjs/testing';
import { IngestionService } from '../src/ingestion/ingestion.service';
import axios from 'axios';

jest.mock('axios');

describe('IngestionService', () => {
  let service: IngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngestionService],
    }).compile();

    service = module.get<IngestionService>(IngestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should trigger ingestion process', async () => {
    const mockResponse = { status: 'success' };
    axios.post.mockResolvedValue(mockResponse);

    const result = await service.triggerIngestionProcess();
    expect(result.status).toEqual('success');
  });

  it('should check ingestion status', async () => {
    const mockStatus = { status: 'Ingesting' };
    axios.get.mockResolvedValue(mockStatus);

    const status = await service.checkIngestionStatus();
    expect(status.status).toEqual('Ingesting');
  });
});
