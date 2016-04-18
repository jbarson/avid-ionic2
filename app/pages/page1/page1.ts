import {Page} from "ionic-angular";


@Page({
    templateUrl: "build/pages/page1/page1.html",
})
export class Page1 {
    hdistance: number = 0;
    vdistance: number = 0;
    // target:Object={direction:this.direction,range:this.range(),band:this.band()};
    direction: number = 0;
    range(): number {
        return Math.floor(Math.sqrt(Math.pow(this.hdistance, 2) + Math.pow(this.vdistance, 2)));
    }
    band(): number {
        let ratio: number = Math.abs(this.hdistance / this.vdistance);
        let result: number = 0;
        if (ratio >= 4) result = 0;
        if (ratio <= 4) result = 1;
        if (ratio <= 1) result = 2;
        if (ratio <= 0.25) result = 3;
        if (this.vdistance < 0) result = -result
        return result;
    }
    reset(): void {
        this.hdistance = 0;
        this.vdistance = 0;
        this.direction = 0;
    }
    rotation: number = 0;

    changeSide() {
        let target = document.getElementById("avidWrapper");
        target.classList.toggle("red");
        target.classList.toggle("blue");
    }
    rotate() {
        this.rotation += 90;
        let delay = 250;
        let target = Snap("#avidColored");
        target.animate({ transform: "r" + this.rotation + ",0,0" }, delay);
        let letters = Snap.selectAll(".rotatable");
        letters.forEach((item) => item.animate({ transform: "r-" + this.rotation + "," + item.attr().x + "," + (item.attr().y - 5) }, delay));
    }
    shootTarget() {
        let target = Snap("#target1");
        let bandRange = [116, 78, 42, 0];
        let altCircle = Snap("#target1 .circle");
        let below = this.band() >= 0 ? 0 : 1;
        let rangeText = Snap("#target1 .targetLabel");
        rangeText.attr({ text: this.range() });
        if (!this.range || this.direction === undefined) return ;
        altCircle.animate({ opacity: below }, 250);
        target.animate({ transform: "t0 -" + bandRange[Math.abs(this.band())] + " R" + this.direction + " 0 0R-" + this.direction }, 250, () => target.animate({ opacity: 1 }, 250));
    }
}
