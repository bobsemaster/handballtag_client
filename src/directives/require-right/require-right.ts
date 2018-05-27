import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {ApplicationDataServiceProvider} from "../../providers/application-data-service/application-data-service";

/**
 * Generated class for the RequireRightDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[appRequireRight]' // Attribute selector
})
export class RequireRightDirective {

  constructor(private applicationData: ApplicationDataServiceProvider, private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) {

    console.log('Hello RequireRightDirective Directive');
  }

  private hasView: boolean = false;

  @Input() set appRequireRight(allRight: String[]) {
    let hasRight: boolean = false;

    for (const right of allRight) {
      if (this.applicationData.authenticatedUser.hasRecht(right)) {
        hasRight = true;
        break;
      }
    }

    if (hasRight && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRight && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
