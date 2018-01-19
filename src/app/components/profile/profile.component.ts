import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {PostSource} from "../../model/PostSource";
import {PostFeedPage} from "../PostFeedPage";
import {IUser} from "../../model/IUser";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends PostFeedPage implements OnInit, OnDestroy {

  private alive: boolean = true;

  private isUserLogged: boolean = false;

  private isAuthorizedUser: boolean = false;

  private viewedUserLoaded: boolean = false;


  private userNotFound: boolean = false;


  private isFriend: boolean = false;
  private hasIncomingFRequest: boolean = false;
  private hasOutcomingFRequest: boolean = false;



  /**
   *  Currently viewed user.
   */
  private viewedUser: any;

  private viewAge: number;

  /**
   * Currently logged user.
   */
  private user: IUser = null;


  @ViewChild('profileContainer')
  private profileContainer: ElementRef;




  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.params.postSource = PostSource.USER;

    //this.isUserLogged = this.authService.isLoggedIn();
    this.isUserLogged = false;
    this.userNotFound = false;


    this.authService.userLoggedIn$
      .takeWhile(() => this.alive)
      .subscribe (
      user => this.registerUserLoggedChange(user)
    );

    this.authService.userLoggedOut$
      .takeWhile(() => this.alive)
      .subscribe (
      () => this.registerUserLoggedChange(null)
    );

    // logged user
    this.authService.getLoggedUser()
      .takeWhile(() => this.alive)
      .subscribe(
      u => {
        this.registerUserLoggedChange(u);


        // viewed user
        this.route.params
          .takeWhile(() => this.alive)
          .subscribe(
        routeParams => this.userService.getUserBySlug(routeParams['slug'])
          .takeWhile(() => this.alive)
          .subscribe(
            (user: IUser) => {

            if(user == null) {
              return;
            }

            this.registerUserViewedChange(user);

            this.params.addFilterParam('authorSlug', this.viewedUser.slug);
            this.params.addFilterParam('authorId', this.viewedUser.id);

            this.viewedUserLoaded = true;

            if(u == null || this.viewedUser == null) {
              return;
            }

            this.isAuthorizedUser = u.id == this.viewedUser.id;
            this.updateRelation();
          }, err => {
            this.userNotFound = true;
            this.router.navigate(['404']);
          })
        );
    });


  }

  private registerUserLoggedChange(user: IUser) {
    if(user == null) {
      this.resetUser();
      return;
    }

    this.user = user;
    this.isUserLogged = true;
  }

  private registerUserViewedChange(user: IUser) {
    this.viewedUser = user;
    let timeDiff: number = Math.abs(Date.now() - this.viewedUser.birth);
    this.viewAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    this.userService.updateLoggedUser(this.viewedUser);
  }

  private resetUser():void {
    this.user = null;
    this.isUserLogged = false;
    this.isFriend = false;
    this.hasIncomingFRequest = false;
    this.hasOutcomingFRequest = false;
  }

  private updateRelation(): void {
    this.isFriend = false;
    this.hasIncomingFRequest = false;
    this.hasOutcomingFRequest = false;


    for(let i = 0; i < this.viewedUser.friends.length; i++) {
      if(this.viewedUser.friends[i].id == this.user.id) {
        this.isFriend = true;
        break;
      }
    }

    if(!this.isFriend) {
      for(let i = 0; i < this.viewedUser.inFReqs.length; i++) {
        if(this.viewedUser.inFReqs[i].id == this.user.id) {
          this.hasIncomingFRequest = true;
          break;
        }
      }
    }

    if(!this.isFriend && !this.hasIncomingFRequest) {
      for(let i = 0; i < this.viewedUser.outFReqs.length; i++) {
        if(this.viewedUser.outFReqs[i].id == this.user.id) {
          this.hasOutcomingFRequest = true;
          break;
        }
      }
    }
  }

  private sendFriendRequest(): void {
    this.userService.sendFriendship(this.viewedUser.id)
      .takeWhile(() => this.alive)
      .subscribe((friend: IUser) => {
        this.handleFrienshipProcessed(friend);
      });
  }

  private approveFriendRequest(): void {
    this.userService.approveFriendship(this.viewedUser.id)
      .takeWhile(() => this.alive)
      .subscribe((friend: IUser) => {
        this.handleFrienshipProcessed(friend);
      });
  }

  private cancelFriendship(): void {
    this.userService.cancelFriendship(this.viewedUser.id)
      .takeWhile(() => this.alive)
      .subscribe((friend: IUser) => {
        this.handleFrienshipProcessed(friend);
      });
  }

  private handleFrienshipProcessed(friend: IUser) {
    this.registerUserViewedChange(friend);
    this.updateRelation();

    this.authService.getLoggedUser(true)
      .subscribe((user: IUser) => {
        this.registerUserLoggedChange(user);
        this.userService.updateLoggedUser(this.user);
      });
  }

  public ngOnDestroy() {
    this.alive = false;
  }

  public registerEditingDone(event) {
    if(event != null) {
      this.registerUserViewedChange(event);
    }

    this.profileContainer.nativeElement.className = 'profile';
  }

  public registerEditing() {
    this.profileContainer.nativeElement.className = 'profile profile--editing';
  }

}
