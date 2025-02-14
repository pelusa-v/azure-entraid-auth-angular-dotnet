import { Component, inject, signal } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { loginRequestData } from '../../auth-config';
import { CommonModule } from '@angular/common';
import { ItemsListComponentComponent } from '../../components/items-list-component/items-list-component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemsListComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Inject MSAL service
  private msal = inject(MsalService);

  // Get the active account (reactive)
  signedInAccount = signal(this.msal.instance.getActiveAccount())

  azureLogin() {
    this.msal.loginPopup(loginRequestData).subscribe((response: AuthenticationResult) => {
      this.signedInAccount.set(response.account);

      // Set the active account for the app msal instance
      this.msal.instance.setActiveAccount(response.account);
    });
  }

  azureLogout() {
    this.msal.logout();
    this.signedInAccount.set(null);
    this.msal.instance.setActiveAccount(null);
  }
}
