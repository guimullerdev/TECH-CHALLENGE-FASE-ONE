export class Services {
  id: string;
  name: string;
  description?: string;
  price: number;
  estimatedTime: number;

  constructor(partial: Partial<Services>) {
    Object.assign(this, partial);
  }
}
