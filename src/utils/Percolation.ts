import { UnionFind } from "./UnionFind";

export class Percolation {
  private size: number;
  private openSitesCount: number;
  private unionFind: UnionFind;
  private fullUnionFind: UnionFind;
  private openSites: number[];
  private bottomIndex: number;

  constructor(size: number) {
    const sitesCount = size * size;

    this.size = size;
    this.openSitesCount = 0;
    this.bottomIndex = sitesCount + 2;
    this.openSites = new Array(sitesCount).fill(0);
    this.unionFind = new UnionFind(sitesCount + 2);
    this.fullUnionFind = new UnionFind(sitesCount + 1);
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

    this.openSites[index - 1] = 1;
    this.openSitesCount++;
  }

  public isOpen(index: number): boolean {
    return !!this.openSites[index - 1];
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
