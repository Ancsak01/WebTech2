import { Component, OnInit } from '@angular/core';
import { DevelopersService } from './developers.service';
import { GamesService } from '../games/games.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  data: Array<any>
  checks: Boolean[]
  isSelected: boolean
  globalIndex: number

  list() {
    this.devService.getDatas().subscribe((data) => {
      console.log(data);
      this.data = data;
    })
    this.game.getGames().subscribe((data) => {
      this.devService.getDatas().subscribe((devs) => {
        let passedID;

        for (const key in devs) {
          if (devs.hasOwnProperty(key)) {
            const item = devs[key];
            console.log(item)
            data.forEach(x => {
              if (item.name == x.developer) {
                passedID = item._id;
              }
            });
          }
        };
        this.devService.getDevsById(passedID).subscribe()
      })
    })
  }

  update() {
    var id = 0;

    var dataObject = {
      name: document.forms[0]["Name"].value,
      place: document.forms[0]["Place"].value,
      rating: document.forms[0]["Rating"].value,
      onlyGameDev: document.forms[0]["OnlyGameDev"].checked,
      games: ""
    }

    this.data.forEach((item, i) => {
      if (item.name == dataObject.name) {
        id = item._id;
      }
    });

    this.devService.updateDevsById(id, dataObject).subscribe(() => {
      this.devService.getDatas().subscribe(res => {
        this.data = res;
        this.closeModal();
      });
    });

    return;
  }

  openModal() {
    (<HTMLElement>document.querySelector('.modal')).style.display = 'block';
    if (this.isSelected) {
      this.devService.getDevsById(this.data[this.globalIndex]._id).subscribe(data => {
        document.forms[0]["Name"].value = data.name;
        document.forms[0]["Place"].value = data.place;
        document.forms[0]["Rating"].value = data.rating;
        document.forms[0]["OnlyGameDev"].checked = data.onlyGameDev;
      })
    }
  }

  closeModal() {
    (<HTMLElement>document.querySelector('.modal')).style.display = 'none';
    document.forms[0]["Name"].value = "";
    document.forms[0]["Place"].value = "";
    document.forms[0]["Rating"].value = "";
    document.forms[0]["OnlyGameDev"].checked = "";
  }

  add() {
    var dataObject = {
      name: document.forms[0]["Name"].value,
      place: document.forms[0]["Place"].value,
      rating: document.forms[0]["Rating"].value,
      onlyGameDev: document.forms[0]["OnlyGameDev"].checked,
      games: ""
    }

    this.devService.addDev(dataObject).subscribe((data) => {
      this.devService.getDatas().subscribe(res => {
        this.data = res;
        this.closeModal();
      })
    })
  }

  toggleSel(event, i) {
    this.checks[i] = event.target.checked;
    if (this.checks[i]) {
      this.isSelected = true;
      this.globalIndex = i;
      return;
    }
    this.isSelected = false;
  }

  delete() {
    if (this.isSelected) {
      this.devService.deleteDevById(this.data[this.globalIndex]._id).subscribe();
      this.list();
    }
  }

  constructor(private devService: DevelopersService, private game: GamesService) {
    this.data = new Array<any>();
  }

  ngOnInit(): void {
    this.checks = new Array(this.data.length)
    this.checks.fill(false);
  }

}
