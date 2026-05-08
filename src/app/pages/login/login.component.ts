import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email: string = '';
  password: string = '';
  errorLogin: boolean = false;

  onSubmit(): void {
    const success = this.authService.login(this.email, this.password);
    
    if (success) {
      this.errorLogin = false;
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/preferits';
      this.router.navigateByUrl(returnUrl);
    } else {
      this.errorLogin = true;
    }
  }
}