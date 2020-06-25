namespace Mumi {
  interface Site {
    name: string;
  }

  interface Config {
    site: Site;
    ejsOption: unknown;
  }

  interface PostMeta {
    title?: string;
    dateStr?: string;
    postName?: string;
  }

  class Mumimal {
    constructor(config: Partial<Config> = {});
    async run(): void;

    config: Config;
    posts: PostMeta[];
  }
}
