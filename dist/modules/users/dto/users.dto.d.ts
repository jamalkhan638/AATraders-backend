export declare class SignupDto {
    firstName: string;
    email: string;
    lastName: string;
    password: string;
}
export declare class UserUpdateDto {
    firstName: string;
    email: string;
    lastName: string;
    password: string;
}
export declare class CreateStaffDto {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    department: number;
    designation: number;
    status: number;
    hourly_rate: number;
    password: string;
    created_at: Date;
    updated_at: Date;
}
export declare class LoginDto {
    email: string;
    password: string;
}
declare const UpdateStaffDto_base: import("@nestjs/common").Type<Partial<CreateStaffDto>>;
export declare class UpdateStaffDto extends UpdateStaffDto_base {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    department: number;
    designation: number;
    status: number;
    hourly_rate: number;
    created_at: Date;
    updated_at: Date;
}
export declare class CreateStaffDepartmentDto {
    name: string;
}
declare const UpdateStaffDepartmentDto_base: import("@nestjs/common").Type<Partial<CreateStaffDepartmentDto>>;
export declare class UpdateStaffDepartmentDto extends UpdateStaffDepartmentDto_base {
    name: string;
}
export declare class CreateStaffDesignationDto {
    name: string;
    department_id: number;
}
declare const UpdateStaffDesignationDto_base: import("@nestjs/common").Type<Partial<CreateStaffDesignationDto>>;
export declare class UpdateStaffDesignationDto extends UpdateStaffDesignationDto_base {
    name: string;
    department_id: number;
}
export declare class CreateAreaDto {
    area: string;
    country_id: number;
    city_id: number;
}
export declare class UpdateAreaDto {
    area: string;
    country_id: number;
    city_id: number;
}
export declare class CreateCountryDto {
    name: string;
    country_code: string;
}
export declare class UpdateCountryDto {
    name: string;
    country_code: string;
}
export declare class CreateCityDto {
    name: string;
    country_id: number;
}
export declare class UpdateCityDto {
    name: string;
    city_id: number;
}
export declare const editFileName: (req: any, file: any, callback: any) => void;
export declare const imageFileFilter: (req: any, file: any, callback: any) => any;
export {};
