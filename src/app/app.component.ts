import { Component} from '@angular/core';
import { ActivatedRoute, Router, Route, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  private identifier: string;


  constructor(private router:Router, private route:ActivatedRoute) { }


  ngOnInit() {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(e => this.identifier = this.route.root.firstChild.snapshot.data['identifier'] );
  }
}
