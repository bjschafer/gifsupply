export class Gif {
  id: string;
  name: string;
  aliases: Array<string>;

  constructor(id: string, name: string, ...aliases: string[]) {
    this.id = id;
    this.name = name;
    this.aliases = aliases;
  }
}

export class GifMapping {
  private gifList: Array<Gif> = [];
  private gifMapping: Record<string, number> = {};

  get(name: string): Gif {
    name = name.replace("/", "");
    return this.gifList[this.gifMapping[name]];
  }

  add(...gifs: Gif[]): void {
    for (const gif of gifs) {
      const index = this.gifList.push(gif) - 1;
      this.gifMapping[gif.name] = index;

      for (const alias of gif.aliases) {
        this.gifMapping[alias] = index;
      }
    }
  }

  index(): string {
    let index = "";
    for (const gif of this.gifList.sort((g1, g2) => {
      if (g1.name > g2.name) {
        return 1;
      }
      if (g1.name < g2.name) {
        return -1;
      }
      return 0;
    })) {
      index = `${index}<a href="${gif.name}">${gif.name}</a><br />`;
    }
    return index;
  }
}

export function getGifMapping(): GifMapping {
  const mapping = new GifMapping();
  mapping.add(
    new Gif("f17899ef-956c-40d9-2d2a-371f22161600", "aw_beans", "awbeans", "aw-beans"),
    new Gif("9e63e011-9c75-4256-70b6-0dd2b1a43b00", "spiderman", "noyou"),
    new Gif("7721c566-fa57-46b0-470d-a6619e4d2000", "themoreyouknow"),
    new Gif("50bf3438-a1f4-48b5-2940-e75ff4d09b00", "nerd", "neeeerd"),
    new Gif("be8ebb25-4e79-41ab-e372-22074a14b400", "excellent", "mrburns"),
    new Gif("24d0f8ee-d4ed-42d5-ef29-069ea5447c00", "bocchi"),
    new Gif(
      "51489de7-b68a-4720-c5d4-37dbb8f87f00",
      "disappear",
      "hedge",
      "homer-hedge"
    ),
    new Gif("72bef933-2fd1-4967-be6d-d7455d463400", "phew")
  );

  return mapping;
}
