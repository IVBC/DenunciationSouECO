import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'phone'
})
export class Phone implements PipeTransform{
	transform(value: string): string{
		return value.substr(0, 5) + '-' + value.substr(5, 4);
	}
}
