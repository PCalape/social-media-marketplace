import { isURL, registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import got from 'got-cjs';
import {fromStream} from 'file-type';
import { BadRequestException } from "@nestjs/common";

@ValidatorConstraint({ name: 'imageValidator', async: false})
export class CustomImageValidatorRule implements ValidatorConstraintInterface {
  async validate(text: string, validationArguments?: ValidationArguments) {
    try {
      const stream = got.stream(text);
      const output = await fromStream(stream);
      return output.mime.startsWith('image/');
    } 
    catch(err) {
      return false;
    } 
  }

  defaultMessage(args: ValidationArguments) {
      return 'File type is not image!'
  }

  
}

export function IsImage(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsImage',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CustomImageValidatorRule,
    });
  };
}