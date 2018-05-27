import { NgModule } from '@angular/core';
import { RequireRightDirective } from './require-right/require-right';
import {ApplicationDataServiceProvider} from "../providers/application-data-service/application-data-service";
@NgModule({
	declarations: [RequireRightDirective],
	imports: [],
	exports: [RequireRightDirective],
  providers: [
    ApplicationDataServiceProvider
  ]
})
export class DirectivesModule {}
