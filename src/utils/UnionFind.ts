export class UnionFind {
  private id: number[];
  private size: number[];

  constructor(size: number) {
    this.id = [];
    this.size = [];

    for (let i = 0; i < size; i++) {
      this.id.push(i);
      this.size.push(1);
    }
  }

  private root(i: number): number {
    while (i != this.id[i]) {
      this.id[i] = this.id[this.id[i]];
      i = this.id[i];
    }

    return i;
  }

  public union(p: number, q: number): void {
    const pRoot = this.root(p);
    const qRoot = this.root(q);

    if (pRoot === qRoot) return;

    if (this.size[pRoot] < this.size[qRoot]) {
      this.id[pRoot] = qRoot;
      this.size[qRoot] += this.size[pRoot];
    } else {
      this.id[qRoot] = pRoot;
      this.size[pRoot] += this.size[qRoot];
    }
  }

  public connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q);
  }
}
