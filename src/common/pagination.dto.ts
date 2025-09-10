import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    @Min(0)
    @Type(() => Number)
    public page?: number;

    @IsOptional()
    @IsPositive()
    @Min(0)
    @Type(() => Number)
    public limit?: number;
}