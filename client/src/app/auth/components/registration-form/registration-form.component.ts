import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { uniqueUsername } from '../../validators/unique-username';
import { AuthService } from '../../services/auth.service';
import { passwordsMatchValidator } from '../../validators/match-password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  roleOptions = [
    {
      label: 'Admin',
      value: 'admin',
    },
    {
      label: 'User',
      value: 'user',
    },
  ];
  organizations = [];
  filteredOrganizations: any[] = [];
  showCreateNewOption: boolean = false;

  registrationForm: FormGroup;

  passwordVisible: boolean = false;
  loader: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.buildRegistrationForm();
  }

  ngOnInit() {
    this.getOrg();
  }

  buildRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        organization: ['', [Validators.required]],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(15),
          ],
          [
            uniqueUsername(
              this.authService,
              () => this.registrationForm?.get('organization')?.value
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        role: ['', Validators.required],
      },
      { validators: passwordsMatchValidator() }
    );

    this.registrationForm.get('organization')?.valueChanges.subscribe(() => {
      this.registrationForm.get('username')?.updateValueAndValidity(); // Update the validity of the username control
    });
  }

  createNewOrganization() {
    const organization = this.registrationForm.get('organization').value;

    if (!organization) {
      return null;
    }

    this.authService.addOrg(organization).subscribe({
      next: (res: any) => {
        if (res?.organization._id) {
          this.organizations = [res.organization, ...this.organizations];
          this.showCreateNewOption = false;
          this.registrationForm
            .get('organization')
            .setValue(res.organization.name);
          this.filterOrganizations(res.organization.name);
        }
      },
      error: () => {},
    });
  }

  getOrg() {
    this.authService.getOrgData().subscribe({
      next: (res: any) => {
        if (res.length) {
          this.organizations = res;
          this.filterOrganizations(
            this.registrationForm.get('organization').value
          );
        }
      },
      error: (err) => {},
    });
  }

  displayFn = (optionId: string): string => {
    if (!optionId) return '';

    const selectedOrganization = this.organizations?.find(
      (org) => org._id === optionId
    );

    return selectedOrganization ? selectedOrganization.name : '';
  };

  filterOrganizations(event: any) {
    let value = '';
    typeof event == 'string' ? (value = event) : (value = event.value);
    this.filteredOrganizations = this.organizations.filter((org) =>
      org.name.toLowerCase().includes(value.toLowerCase())
    );

    this.showCreateNewOption = !this.filteredOrganizations.some(
      (org) => org.name.toLowerCase() === value.toLowerCase()
    );
  }

  togglePasswordVisbility(event: any) {
    if (event.pointerType == 'mouse') {
      this.passwordVisible = !this.passwordVisible;
      setTimeout(() => {
        this.passwordVisible = !this.passwordVisible;
      }, 300);
    }
  }

  resetForm() {
    this.registrationForm.reset();
  }

  registerNewUser() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.loader = true;
    this.authService.registerUser(this.registrationForm.value).subscribe({
      next: (data) => {
        this.loader = false;

        this.router.navigate(['']);
      },
      error: (err) => {},
    });
  }
}
