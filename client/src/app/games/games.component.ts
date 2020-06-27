import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';
import { DevelopersService } from '../developers/developers.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  data: Array<any>
  checks: Boolean[]
  isSelected: boolean
  globalIndex: number
  platforms = ["PC", "PS", "XBox"];

  list() {
    this.game.getGames().subscribe((data) => {
      this.data = data;
    })
  }

  openModal() {
    (<HTMLElement>document.querySelector('.modal')).style.display = 'block';
    if (this.isSelected) {
      this.game.getGameById(this.data[this.globalIndex]._id).subscribe(data => {
        document.forms[0]["Name"].value = data.name;
        document.forms[0]["Platform"].value = data.platform;
        document.forms[0]["EstPT"].value = data.estPlayTime;
        document.forms[0]["Developer"].value = data.developer;
        document.forms[0]["Sponsor"].value = data.sponsoredBy;
      })
    }
  }

  closeModal() {
    (<HTMLElement>document.querySelector('.modal')).style.display = 'none';
  }

  update() {
    var id = 0;

    var dataObject = {
      name: document.forms[0]["Name"].value,
      platform: document.forms[0]["Platform"].value,
      estPlayTime: document.forms[0]["EstPT"].value,
      developer: document.forms[0]["Developer"].value,
      sponsoredBy: document.forms[0]["Sponsor"].value,
    }

    this.data.forEach((item, i) => {
      if (item.name == dataObject.name) {
        id = item._id;
      }
    });

    this.game.updateGameById(id, dataObject).subscribe(() => {
      this.game.getGames().subscribe(res => {
        this.data = res;
        this.closeModal();
      })
    })

    return;
  }

  add() {
    var dataObject = {
      name: document.forms[0]["Name"].value,
      platform: document.forms[0]["Platform"].value,
      estPlayTime: document.forms[0]["EstPT"].value,
      developer: document.forms[0]["Developer"].value,
      sponsoredBy: document.forms[0]["Sponsor"].value,
    }

    this.game.addGames(dataObject).subscribe((data) => {
      this.dev.getDatas().subscribe((devs) => {
        let passedID;

        for (const key in devs) {
          if (devs.hasOwnProperty(key)) {
            const item = devs[key];
            console.log(item)
            if (item.name == data.developer) {
              passedID = item._id;
            }
          }
        };
        this.dev.getDevsById(passedID).subscribe()
      })
    })

    document.forms[0]["Name"].value = "";
    document.forms[0]["Platform"].value = "";
    document.forms[0]["EstPT"].value = "";
    document.forms[0]["Developer"].value = "";
    document.forms[0]["Sponsor"].value = "";
    this.closeModal();
    this.game.getGames().subscribe(res => {
      this.data = res;

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
      this.game.deleteGame(this.data[this.globalIndex]._id).subscribe();
      this.dev.getDevsById(this.data[this.globalIndex]._id).subscribe();
      this.list();
    }
  }

  constructor(private game: GamesService, private dev: DevelopersService) {
    this.data = new Array<any>()
  }

  ngOnInit(): void {
    this.checks = new Array(this.data.length)
    this.checks.fill(false);
  }

}
