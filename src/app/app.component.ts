import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'async-wait';

  tick =  Date.now();
  log = v => console.log(`${v} \n Elapsed: ${Date.now() - this.tick} ms`);

  loop = async seconds => {
      const until = new Date().getTime() + seconds * 1000;
      let now = new Date().getTime();
      while (now < until) {
        now = new Date().getTime();
        await this.wait(1);
      }
      return `loop: ${seconds}`;

  }

  wait = (ms) => {
    return new Promise(r => setTimeout(r, ms));
  }

  ngOnInit() {
    this.log('synchronous 1');
    (async () => (async () => {
      const a = this.loop(10).then( result => {this.log(result); return result; });
      const b = this.loop(3).then( result => {this.log(result); return result; });
      const result = await Promise.all([a, b]);
      console.log(result + '');
    })())();
    this.log('synchronous 2');
  }
}
