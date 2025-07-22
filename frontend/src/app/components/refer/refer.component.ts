import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReferService } from '../../services/refer.service';
import { Referral, UserRewards } from '../../models/app.model';
import { RouterLink } from '@angular/router';
import { ClipboardModule,Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-refer',
  imports: [CommonModule,ClipboardModule],
  templateUrl: './refer.component.html',
  styleUrl: './refer.component.css'
})
export class ReferComponent {
  laptopWinners: Referral[] = [
  {
    id: 1,
    referredBy: 'XYZ123',
    referredUser: 'user@example.com',
    date: '2025-07-12',
    avatar: 'https://i.pravatar.cc/40',
    name: 'Akhil Reddy',
    referrals: 42
  },
  {
    id: 2,
    referredBy: 'XYZ456',
    referredUser: 'another@example.com',
    date: '2025-07-10',
    avatar: 'https://i.pravatar.cc/40',
    name: 'Kavya K',
    referrals: 35
  }
];

  referralCode: string = 'PLUSB1ZXU';
 userRewards: UserRewards = {
  referralCode: 'PLUSB1ZXU',
  rewards: {
    amazonVoucher: 0,
    plusMonths: 0
  }
};

  referrals: Referral[] = [];

  constructor(
  private referService: ReferService,
  private clipboard: Clipboard
) {}


  ngOnInit() {
    this.loadReferrals();
    this.loadRewards();
  }

  loadReferrals() {
    this.referService.getReferrals().subscribe(data => {
      this.referrals = data.filter(ref => ref.referredBy === this.referralCode);

    });
  }

  loadRewards() {
    this.referService.getRewards().subscribe(rewards => {
      const match = rewards.find(r => r.referralCode === this.referralCode);
      if (match) this.userRewards = match;
    });
  }

copyCode() {
  if (this.clipboard.copy(this.referralCode)) {
    alert('Referral code copied!');
  } else {
    alert('Failed to copy the code. Please copy manually.');
  }
}




  shareCode() {
    const message = `Use my referral code ${this.referralCode} to sign up and earn rewards!`;
    if (navigator.share) {
      navigator.share({
        title: 'Join LearnNow',
        text: message,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert(message);
    }
  }
}  
