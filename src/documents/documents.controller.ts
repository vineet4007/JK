import { Controller, Post, Get, Param, Delete, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createDocument(@Body() createDocumentDto: CreateDocumentDto, @UploadedFile() file: Express.Multer.File) {
    return this.documentsService.create(createDocumentDto, file);
  }

  @Get(':id')
  async getDocument(@Param('id') id: number) {
    return this.documentsService.findOne(id);
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: number) {
    return this.documentsService.remove(id);
  }
}
