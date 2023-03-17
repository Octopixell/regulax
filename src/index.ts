interface MatchIndexes {
  [key: string]: number;
}

interface PatternMatches {
  [key: string]: string;
}

export default class Regulax {
  private pattern: string;

  private regex: RegExp;

  private matchIndexes: MatchIndexes;

  constructor(pattern: string) {
    this.pattern = pattern;
    this.regex = this.createRegex();
    this.matchIndexes = this.getMatchIndexes();
  }

  private createRegex() {
    const regexPattern = this.pattern
      .replace(/\./g, '\\.')
      .replace(/-/g, '\\-')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\*\{/g, '*/{')
      .replace(/\*/g, '.*')
      .replace(/\?/g, '\\?')
      .replace(/\(/g, '{')
      .replace(/\)/g, '}')
      .replace(/\{\.\*\}/g, '(.*)')
      .replace(/\{[^}]*\}/g, '([^]+)');

    return new RegExp(regexPattern);
  }

  private getMatchIndexes() {
    const regex = /\{([^}]+)\}+/g;
    const matchIndexes: MatchIndexes = {};
    const matches = [...this.pattern.matchAll(regex)].map((match) => match[1]);

    let wilcardIndex = 1;

    for (let i = 0; i < matches.length; i += 1) {
      if (matches[i] === '*') {
        matchIndexes[wilcardIndex] = i + 1;
        wilcardIndex += 1;
      } else {
        matchIndexes[matches[i]] = i + 1;
      }
    }

    return matchIndexes;
  }

  public test(input: string): boolean {
    return this.regex.test(input);
  }

  public match(input: string): PatternMatches {
    const match = this.regex.exec(input);
    const patternMatches: PatternMatches = {};

    if (!match) return {};

    Object.keys(this.matchIndexes).forEach((index) => {
      patternMatches[index] = match[this.matchIndexes[index]];
    });

    return patternMatches;
  }
}
