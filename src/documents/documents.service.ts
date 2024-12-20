import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];

  uploadDocument(createDocumentDto: CreateDocumentDto) {
    const newDoc = { ...createDocumentDto, id: Date.now().toString() };
    this.documents.push(newDoc);
    return newDoc;
  }

  findAll() {
    return this.documents;
  }

  findOne(id: string) {
    return this.documents.find((doc) => doc.id === id);
  }

  update(id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = this.documents.find((doc) => doc.id === id);
    if (document) {
      Object.assign(document, updateDocumentDto);
      return document;
    }
    return null;
  }

  remove(id: string) {
    const index = this.documents.findIndex((doc) => doc.id === id);
    if (index !== -1) {
      this.documents.splice(index, 1);
      return { message: 'Document deleted successfully' };
    }
    return { message: 'Document not found' };
  }
}
