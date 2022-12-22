import { UnionFind } from "./UnionFind";

export class Percolation {
  private unionFind: UnionFind;
  private openSites: number[];
  private size: number;
  private openSitesCount: number;

  constructor(size: number) {
    const sitesCount = size * size + 2;

    this.unionFind = new UnionFind(sitesCount);
    this.openSites = [];
    this.size = size;
    this.openSitesCount = 0;

    for (let i = 0; i < sitesCount; i++) {
      if (i === 0 || i === sitesCount - 1) {
        this.openSites.push(1);
      } else {
        this.openSites.push(0);
      }
    }
  }

  private connectSide(
    row: number,
    col: number,
    side: "T" | "B" | "L" | "R"
  ): void {
    let nextRow: number;
    let nextCol: number;

    switch (side) {
      case "T":
        nextRow = row - 1;
        nextCol = col;

        if (nextRow === 0) {
          this.unionFind.union(0, this.indexOf(row, col));
          return;
        }
        break;
      case "B":
        nextRow = row + 1;
        nextCol = col;

        if (nextRow === this.size + 1) {
          this.unionFind.union(
            this.size * this.size + 1,
            this.indexOf(row, col)
          );
          return;
        }
        break;
      case "L":
        nextRow = row;
        nextCol = col - 1;

        if (nextCol === 0) return;
        break;
      case "R":
        nextRow = row;
        nextCol = col + 1;

        if (nextCol === this.size + 1) return;
        break;
    }

    if (!this.isOpen(nextRow, nextCol)) return;

    this.unionFind.union(
      this.indexOf(row, col),
      this.indexOf(nextRow, nextCol)
    );
  }

  public indexOf(row: number, col: number): number {
    return row * this.size + col - this.size;
  }

  public open(row: number, col: number): void {
    if (this.isOpen(row, col)) return;

    this.connectSide(row, col, "T");
    this.connectSide(row, col, "B");
    this.connectSide(row, col, "L");
    this.connectSide(row, col, "R");

    this.openSites[this.indexOf(row, col)] = 1;
    this.openSitesCount++;
  }

  public isOpen(row: number, col: number): boolean {
    return !!this.openSites[this.indexOf(row, col)];
  }

  public isFull(row: number, col: number): boolean {
    return this.unionFind.connected(0, this.indexOf(row, col));
  }

  public numberOfOpenSites(): number {
    return this.openSitesCount;
  }

  public percolates(): boolean {
    return this.unionFind.connected(0, this.size * this.size + 1);
  }
}
