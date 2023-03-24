export class Product {
  constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly description: string,
    private readonly price: number,
  ) {}
  getId(): string {
    return this.id;
  }
}
