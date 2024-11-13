export enum ItemType {
    Sulfuras = 'Sulfuras',
    AgedBrie = 'AgedBrie',
    Backstage = 'Backstage',
    Conjured = 'Conjured',
    Normal = 'Normal',
}

export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    private getItemType(item: Item): ItemType {
        if (item.name.indexOf('Sulfuras') !== -1) {
            return ItemType.Sulfuras;
        } else if (item.name.indexOf('Aged Brie') !== -1) {
            return ItemType.AgedBrie;
        } else if (item.name.indexOf('Backstage') !== -1) {
            return ItemType.Backstage;
        } else if (item.name.indexOf('Conjured') !== -1) {
            return ItemType.Conjured;
        }
        return ItemType.Normal;
    }

    private updateSellInByItemType(item: Item, itemType: string): void {
        if (itemType !== ItemType.Sulfuras) {
            item.sellIn = item.sellIn - 1;
        }
    }

    private canIncreaseQuality(item: Item): boolean {
        return item.quality < 50;
    }

    private canDecreaseQuality(item: Item): boolean {
        return item.quality > 0;
    }

    private increaseQuality(item: Item, amount: number = 1): void {
        item.quality = Math.min(50, item.quality + amount);
    }

    private decreaseQuality(item: Item, amount: number = 1): void {
        item.quality = Math.max(0, item.quality - amount);
    }

    private updateQualityByItemType(item: Item, itemType: ItemType): void {
        switch (itemType) {
            case ItemType.Normal:
                if (this.canDecreaseQuality(item)) {
                    this.decreaseQuality(item);
                    if (item.sellIn < 0) {
                        this.decreaseQuality(item);
                    }
                }
                break;

            case ItemType.AgedBrie:
                if (this.canIncreaseQuality(item)) {
                    this.increaseQuality(item);
                    if (item.sellIn < 0 && this.canIncreaseQuality(item)) {
                        this.increaseQuality(item);
                    }
                }
                break;

            case ItemType.Backstage:
                if (item.sellIn < 0) {
                    item.quality = 0;
                } else {
                    if (this.canIncreaseQuality(item)) {
                        this.increaseQuality(item);
                        if (
                            item.sellIn <= 10 &&
                            this.canIncreaseQuality(item)
                        ) {
                            this.increaseQuality(item);
                        }
                        if (item.sellIn <= 5 && this.canIncreaseQuality(item)) {
                            this.increaseQuality(item);
                        }
                    }
                }
                break;

            case ItemType.Conjured:
                if (this.canDecreaseQuality(item)) {
                    this.decreaseQuality(item, 2);
                    if (item.sellIn < 0) {
                        this.decreaseQuality(item, 2);
                    }
                }
                break;

            case ItemType.Sulfuras:
                break;

            default:
                break;
        }
    }

    updateQuality(): void {
        for (let i = 0; i < this.items.length; i++) {
            const currentItem = this.items[i];

            const itemType = this.getItemType(currentItem);

            this.updateSellInByItemType(currentItem, itemType);
            this.updateQualityByItemType(currentItem, itemType);
        }
    }
}
