import { NgModule } from '@angular/core';

import { URLPipe } from './href.pipe';

@NgModule({
    exports: [URLPipe],
    declarations: [URLPipe],
})
export class URLPipeModule { }
