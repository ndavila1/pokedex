import { NgModule } from '@angular/core';
import { 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule, 
    MatSnackBarModule,
    MatListModule, } from "@angular/material";
@NgModule({
    declarations: [],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatListModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatListModule
    ],
    providers: [],
})
export class MaterialModule {}