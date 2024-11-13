const assert = require('assert');
import { GildedRose, Item } from '../app/gilded-rose';
console.log(GildedRose);

describe('GildedRose', function () {
    describe('updateQuality', function () {
        it('Instance of GildedRose', function () {
            const gildedRose = new GildedRose();
            assert.ok(gildedRose instanceof GildedRose);
        });

        describe('Normal Items', () => {
            it('Update quality and sellIn from a normal item', () => {
                let items = [new Item('Normal Item', 10, 20)];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(gildedRose.items[0].sellIn, 9);
                assert.equal(gildedRose.items[0].quality, 19);
            });

            it('The Quality of an item is never negative', () => {
                let items = [new Item('Normal Item', 10, 0)];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(gildedRose.items[0].sellIn, 9);
                assert.equal(gildedRose.items[0].quality, 0);
            });

            it('Degrades quality twice as fast if sellIn is less than 0', () => {
                let items = [new Item('Normal Item', -1, 20)];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(gildedRose.items[0].quality, 18);
                assert.equal(gildedRose.items[0].sellIn, -2);
            });
        });

        describe('Aged Brie', () => {
            it('Increases in Quality the older it gets', () => {
                let items = [
                    new Item('Aged Brie', 10, 0),
                    new Item('Aged Brie', -1, 0),
                ];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(gildedRose.items[0].sellIn, 9);
                assert.equal(gildedRose.items[0].quality, 1);
            });

            it('Increases in Quality twice as fast if sellIn is less than 0', () => {
                let items = [new Item('Aged Brie', -1, 0)];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(gildedRose.items[0].sellIn, -2);
                assert.equal(gildedRose.items[0].quality, 2);
            });

            it('The Quality of an item is never more than 50', () => {
                let items = [new Item('Aged Brie', 10, 50)];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(gildedRose.items[0].sellIn, 9);
                assert.equal(gildedRose.items[0].quality, 50);
            });
        });

        describe('Sulfuras, Hand of Ragnaros', () => {
            it('Has a fixed Quality of 80', () => {
                const items = [
                    new Item('Sulfuras, Hand of Ragnaros', 10, 80),
                    new Item('Sulfuras, Hand of Ragnaros', -1, 80),
                ];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(items[0].quality, 80);
                assert.equal(items[1].quality, 80);
            });

            it('Never has to be sold, never decreases the sellIn', () => {
                const items = [
                    new Item('Sulfuras, Hand of Ragnaros', 10, 80),
                    new Item('Sulfuras, Hand of Ragnaros', -1, 80),
                ];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(items[0].sellIn, 10);
                assert.equal(items[1].sellIn, -1);
            });
        });

        describe('Backstage passes', () => {
            it('Quality is never more than 50', () => {
                const items = [
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        15,
                        50,
                    ),
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        7,
                        50,
                    ),
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        3,
                        50,
                    ),
                ];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(items[0].sellIn, 14);
                assert.equal(items[0].quality, 50);

                assert.equal(items[1].sellIn, 6);
                assert.equal(items[1].quality, 50);

                assert.equal(items[2].sellIn, 2);
                assert.equal(items[2].quality, 50);
            });

            it('Quality increases by 1 when there are more that 10 days', () => {
                const items = [
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        15,
                        20,
                    ),
                ];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(items[0].sellIn, 14);
                assert.equal(items[0].quality, 21);
            });

            it('Quality increases by 2 when there are 10 days or less', () => {
                const items = [
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        10,
                        20,
                    ),
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        8,
                        30,
                    ),
                ];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(items[0].sellIn, 9);
                assert.equal(items[0].quality, 22);

                assert.equal(items[1].sellIn, 7);
                assert.equal(items[1].quality, 32);
            });

            it('Quality increases by 3 when there are 5 days or less', () => {
                const items = [
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        5,
                        20,
                    ),
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        3,
                        30,
                    ),
                ];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(items[0].sellIn, 4);
                assert.equal(items[0].quality, 23);

                assert.equal(items[1].sellIn, 2);
                assert.equal(items[1].quality, 33);
            });

            it('Drops Quality to 0 after the event', () => {
                const items = [
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        0,
                        20,
                    ),
                    new Item(
                        'Backstage passes to a TAFKAL80ETC concert',
                        -1,
                        50,
                    ),
                ];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(items[0].sellIn, -1);
                assert.equal(items[0].quality, 0);

                assert.equal(items[1].sellIn, -2);
                assert.equal(items[1].quality, 0);
            });
        });

        describe('Conjured Items', () => {
            it('Quality decreases twice as fast', () => {
                const items = [
                    new Item('Conjured Mana Cake', 10, 20),
                    new Item('Conjured Mana Cake', 0, 20),
                    new Item('Conjured Mana Cake', -1, 20),
                    new Item('Conjured Mana Cake', 5, 1),
                ];

                const gildedRose = new GildedRose(items);
                gildedRose.updateQuality();

                assert.equal(items[0].sellIn, 9);
                assert.equal(items[0].quality, 18);

                assert.equal(items[1].sellIn, -1);
                assert.equal(items[1].quality, 16);

                assert.equal(items[2].sellIn, -2);
                assert.equal(items[2].quality, 16);

                assert.equal(items[3].sellIn, 4);
                assert.equal(items[3].quality, 0);
            });
        });
    });
});
