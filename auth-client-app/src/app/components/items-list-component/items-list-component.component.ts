import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { loginRequestItemsData } from '../../auth-config';
import { AuthenticationResult } from '@azure/msal-browser';
import { firstValueFrom } from 'rxjs';
import { Item } from './items.model';

@Component({
  selector: 'app-items-list-component',
  imports: [CommonModule],
  templateUrl: './items-list-component.component.html',
  styleUrl: './items-list-component.component.css'
})
export class ItemsListComponentComponent {
  private msal = inject(MsalService);
  private httpClient = inject(HttpClient);
  private itemsUrl = 'http://localhost:5174/items';  // local protected backend API URL

  items = signal<Item[]>([]);
  
  async ngOnInit() {
    const activeAccount = this.msal.instance.getActiveAccount();
    if (activeAccount) {
      await this.getItems();
    } else {
      console.log('User is not authenticated');
    }
  }

  async getItems() {
    const httpRes: AuthenticationResult = await this.msal.instance.acquireTokenSilent(loginRequestItemsData);
    console.log(httpRes.accessToken);
    const itemsData = await firstValueFrom(this.httpClient.get<Item[]>(this.itemsUrl, {
      headers: { Authorization: `Bearer ${httpRes.accessToken}` }
    }));

    this.items.set(itemsData || []);
  }
}
