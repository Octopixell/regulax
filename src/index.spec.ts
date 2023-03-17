/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, test } from '@jest/globals';
import Regulax from '.';

describe('Regulax', () => {
  describe('test()', () => {
    test('should return `true` if pattern matches', () => {
      const pattern = new Regulax('*.js');
      expect(pattern.test('hello.js')).toBeTruthy();
    });

    test('should return `false` if pattern does not match', () => {
      const pattern = new Regulax('*.zip');
      expect(pattern.test('hello.js')).toBeFalsy();
    });
  });

  describe('match()', () => {
    test('should return the correct matches', () => {
      const pattern = new Regulax('{folder}/{filename}.js');
      expect(pattern.match('home/hello.js')).toEqual({
        folder: 'home',
        filename: 'hello',
      });
    });

    test('should return an empty object if no matches were found', () => {
      const pattern = new Regulax('{folder}/{filename}?{params}');
      expect(pattern.match('hello.js?p=1')).toEqual({});
    });

    test('should match strings with `.` and `?` characters', () => {
      const pattern = new Regulax('{folder}/{filename}?{params}');
      expect(pattern.match('home/hello.js?p=1')).toEqual({
        folder: 'home',
        filename: 'hello.js',
        params: 'p=1',
      });
    });

    test('should match single wildcard', () => {
      const pattern = new Regulax('*/{filename}');
      expect(pattern.match('home/hello.js')).toEqual({ filename: 'hello.js' });
    });

    test('should match multiple wildcards', () => {
      const pattern = new Regulax('{*}/{filename}?{*}');
      expect(pattern.match('www.site.com/home/hello.js?p=1')).toEqual({
        1: 'www.site.com/home',
        2: 'p=1',
        filename: 'hello.js',
      });
    });

    test('should support *{param} syntax as if it was */{param}', () => {
      const pattern = new Regulax('*{filename}');
      expect(pattern.match('home/hello.js')).toEqual({ filename: 'hello.js' });
    });

    test('should not replace `/` characters', () => {
      const pattern = new Regulax('{event}');
      expect(pattern.match('UI/UX Meeting')).toEqual({
        event: 'UI/UX Meeting',
      });
    });
  });
});
