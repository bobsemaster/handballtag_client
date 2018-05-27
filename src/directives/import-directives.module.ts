import {NgModule} from '@angular/core';
import {RequireRightDirective} from "./require-right/require-right";


// Wird gebraucht da sonst wenn Directives Module benutzt wird ein fehler geworfen wird
@NgModule({
  declarations: [RequireRightDirective],
  exports: [RequireRightDirective],
})
export class ImportDirectivesModule {
}
