import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DiskStorageOptions } from '@nestjs/platform-express/multer/interfaces';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto, file: Express.Multer.File) {
    const document = this.documentsRepository.create({
      ...createDocumentDto,
      filename: file.filename,
      path: file.path,
    });
    await this.documentsRepository.save(document);
    return document;
  }

  async findOne(id: number) {
    return this.documentsRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const document = await this.findOne(id);
    if (document) {
      await this.documentsRepository.remove(document);
      return { message: 'Document deleted successfully' };
    }
    throw new Error('Document not found');
  }
}
