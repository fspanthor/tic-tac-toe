export class Player {
  name: string;
  id: number;
  constructor(name: string) {
    this.name = name;
    this.id = Math.random();
  }
}
