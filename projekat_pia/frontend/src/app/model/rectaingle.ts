export class Pravougaonik{
    x: number;
    y: number;
    width: number;
    height: number;
    door: boolean;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setDoor(door: boolean){
        this.door = door;
    }
    getDoor(): boolean {
        return this.door;
    }

    intersects(other: Pravougaonik): boolean {    // ako se prosledjeni kvadrat preklapa sa ovim, vrati true
        return (
          this.x < other.x + other.width &&
          this.x + this.width > other.x &&
          this.y < other.y + other.height &&
          this.y + this.height > other.y
        );
    }

}