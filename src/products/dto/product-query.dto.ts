import { ApiProperty } from '@nestjs/swagger';

export class ProductQueryDto {
    @ApiProperty({
        required: false
    })
    public filter: string = "";
    
}

