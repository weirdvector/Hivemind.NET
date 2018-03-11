/*
 * This file is autogenerated. Please see README.md for instructions on editing.
 */

import { Weapon } from './Weapon';
import { HttpParams } from '@angular/common/http';

export class GangerWeapon {
    public gangerWeaponId: string;
    public gangerId: string;
    public weapon: Weapon;
    public cost: number;

    public constructor(partial: Partial<GangerWeapon>) {
        if (partial.gangerWeaponId) {
            this.gangerWeaponId = partial.gangerWeaponId;
        }
        if (partial.gangerId) {
            this.gangerId = partial.gangerId;
        }
        if (partial.weapon) {
            this.weapon = partial.weapon;
        }
        if (partial.cost) {
            this.cost = partial.cost;
        }
    }

    public toHttpParams(): HttpParams {
        let params = new HttpParams();
        let properties = [];
        if (this.gangerWeaponId) {
            properties.push('gangerWeaponId');
        }
        if (this.gangerId) {
            properties.push('gangerId');
        }
        if (this.weapon) {
            properties.push('weapon');
        }
        if (this.cost) {
            properties.push('cost');
        }

        properties.forEach(prop => {
            params = params.set(prop, this[prop]);
        });

        return params;
    }
}