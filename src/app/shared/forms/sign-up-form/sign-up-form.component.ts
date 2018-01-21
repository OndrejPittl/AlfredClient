import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {IUser} from "../../../model/IUser";
import {Router} from "@angular/router";
import {IValidationError} from "../../../model/IValidationError";
import {PostService} from "../../../services/post.service";


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html'
})

export class SignUpFormComponent implements OnInit, OnDestroy {

  private alive: boolean = true;

  @Input()
  private user:IUser = {
    sex: "MALE"
  } as IUser;

  private userBackup: IUser;

  @Input()
  private formId: string;

  @Output('edited')
  change: EventEmitter<IUser> = new EventEmitter<IUser>();

  @ViewChild("fileInput")
  private fileInput;


  private valid:boolean = false;

  private isSignUpForm: boolean = true;

  private validationMessages: Array<IValidationError>;


  @ViewChild('signUpForm') form;


  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private postService: PostService) { }


  ngOnInit() {
    this.init();
    this.isSignUpForm = this.user['email'] == undefined;
  }

  public init(): void {
    this.validationMessages = [];
    this.userBackup = {...this.user};
  }

  public signUp(event): void {
    this.init();

    //sign up
    this.userService.createUser(this.user)
      .takeWhile(() => this.alive)
      .subscribe( () => {

          // sign in
          this.authService.auth(this.user['email'], this.user['password'])
            .takeWhile(() => this.alive)
            .subscribe(user => {
              this.router.navigate(['discover']);
            },error => {
              this.registerErrors(error);
            });

        }, error => {
          this.registerErrors(error);
          this.user.password = this.user.confirmPassword = this.user.captcha = "";
        }
    );
  }

  private registerErrors(errors: any): void {
    this.validationMessages = <Array<IValidationError>> errors.error;
    this.valid = false;

    for(let e of this.validationMessages) {
      let err: IValidationError = <IValidationError> e;
      this.form.controls[err.field].setErrors({'incorrect': true, 'serverError': true});
    }

    console.log(this.valid)
  }


  // TODO: editace údajů
  public doEdit(event): void {
    if(!this.ifPhotoSelected()) {
      this.user.photo = null;
    }

    this.userService.updateUser(this.user)
      .takeWhile(() => this.alive)
      .subscribe(user => {
        this.user = user;
        this.change.emit(user);
      }, error => {
        this.registerErrors(error);
        this.user.password = this.user.confirmPassword = this.user.captcha = "";
      });
  }




  ngOnDestroy(): void {
    this.alive = false;
  }

  cancelEditing() {
    this.user = this.userBackup;
    this.change.emit(this.userBackup);
  }

  private ifPhotoSelected(): boolean {
    let fi = this.fileInput.nativeElement;
    return fi.files && fi.files[0];
  }

  private changePhoto(): void {
    let fi = this.fileInput.nativeElement;

    if (this.ifPhotoSelected()) {
      let fileToUpload: File = fi.files[0];

      this.postService.readFile(fileToUpload)
        .subscribe(img => {
          this.user.photo = img;
        });
    }
  }
}
