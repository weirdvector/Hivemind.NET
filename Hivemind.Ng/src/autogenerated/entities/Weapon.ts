
export class Weapon {
    public weaponEnum: string;
    public name: string;
    public weaponType: string;
    public weaponAvailability: string;
    public shortRange: string;
    public longRange: string;
    public hitShort: string;
    public hitLong: string;
    public strength: string;
    public damage: string;
    public saveMod: string;
    public ammoRoll: string;
    public cost: string;
    public specialRules: string;
    public effect: any;

    public constructor(partial: Partial<Weapon>) {
        if (partial.weaponEnum) {
            this.weaponEnum = partial.weaponEnum;
        }
        if (partial.name) {
            this.name = partial.name;
        }
        if (partial.weaponType) {
            this.weaponType = partial.weaponType;
        }
        if (partial.weaponAvailability) {
            this.weaponAvailability = partial.weaponAvailability;
        }
        if (partial.shortRange) {
            this.shortRange = partial.shortRange;
        }
        if (partial.longRange) {
            this.longRange = partial.longRange;
        }
        if (partial.hitShort) {
            this.hitShort = partial.hitShort;
        }
        if (partial.hitLong) {
            this.hitLong = partial.hitLong;
        }
        if (partial.strength) {
            this.strength = partial.strength;
        }
        if (partial.damage) {
            this.damage = partial.damage;
        }
        if (partial.saveMod) {
            this.saveMod = partial.saveMod;
        }
        if (partial.ammoRoll) {
            this.ammoRoll = partial.ammoRoll;
        }
        if (partial.cost) {
            this.cost = partial.cost;
        }
        if (partial.specialRules) {
            this.specialRules = partial.specialRules;
        }
        if (partial.effect) {
            this.effect = partial.effect;
        }
    }
}