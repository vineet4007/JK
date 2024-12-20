import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from '../src/documents/documents.service';
import { CreateDocumentDto } from '../src/documents/dto/create-document.dto';
import { UpdateDocumentDto } from '../src/documents/dto/update-document.dto';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentsService],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload a document', async () => {
    const createDocumentDto: CreateDocumentDto = { title: 'Test Doc', content: 'Content of the document' };
    const result = await service.uploadDocument(createDocumentDto);
    expect(result.title).toEqual('Test Doc');
    expect(result.content).toEqual('Content of the document');
  });

  it('should find all documents', () => {
    const documents = service.findAll();
    expect(documents).toEqual(expect.arrayContaining([]));
  });

  it('should update a document', () => {
    const updateDocumentDto: UpdateDocumentDto = { title: 'Updated Title', content: 'Updated Content' };
    const document = service.update('1', updateDocumentDto);
    expect(document.title).toEqual('Updated Title');
  });

  it('should remove a document', () => {
    const result = service.remove('1');
    expect(result.message).toBe('Document deleted successfully');
  });
});
