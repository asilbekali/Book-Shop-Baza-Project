import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book name',
    example: 'kitob1',
  })
  name: string;

  @ApiProperty({
    description: 'Book price',
    example: 2500,
  })
  price: number;
}
