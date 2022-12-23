import { UnionFind } from "./UnionFind";

export class Percolation {
  private openSites: number[];
  private unionFind: UnionFind;
  private fullUnionFind: UnionFind;
  private size: number;
  private openSitesCount: number;
  private bottomIndex: number;

  constructor(size: number) {
    const sitesCount = size * size + 2;

    this.unionFind = new UnionFind(sitesCount);
    this.fullUnionFind = new UnionFind(sitesCount - 1);
    this.openSites = [];
    this.size = size;
    this.openSitesCount = 0;
    this.bottomIndex = size * size + 1;

    for (let i = 0; i < sitesCount; i++) {
      if (i === 0 || i === sitesCount - 1) {
        this.openSites.push(1);
      } else {
        this.openSites.push(0);
      }
    }
  }

  public open(index: number): void {
    if (this.isOpen(index)) return;

    if (index - this.size <= 0) {
      this.unionFind.union(0, index);
      this.fullUnionFind.union(0, index);
    }

    if (index + this.size >= this.bottomIndex) {
      this.unionFind.union(index, this.bottomIndex);
    }

    if (index - this.size > 0 && this.isOpen(index - this.size)) {
      this.unionFind.union(index, index - this.size);
      this.fullUnionFind.union(index, index - this.size);
    }

    if (
      index + this.size < this.bottomIndex &&
      this.isOpen(index + this.size)
    ) {
      this.unionFind.union(index, index + this.size);
      this.fullUnionFind.union(index, index + this.size);
    }

    if (index % this.size != 1 && this.isOpen(index - 1)) {
      this.unionFind.union(index, index - 1);
      this.fullUnionFind.union(index, index - 1);
    }

    if (index % this.size != 0 && this.isOpen(index + 1)) {
      this.unionFind.union(index, index + 1);
      this.fullUnionFind.union(index, index + 1);
    }

    this.openSites[index] = 1;
    this.openSitesCount++;
  }

  public isOpen(index: number): boolean {
    return !!this.openSites[index];
  }

  public isFull(index: number): boolean {
    return this.fullUnionFind.connected(0, index);
  }

  public numberOfOpenSites(): number {
    return this.openSitesCount;
  }

  public percolates(): boolean {
    return this.unionFind.connected(0, this.bottomIndex);
  }
}
