/*
 * This file is autogenerated. Please see README.md for instructions on editing.
 */

import { HttpParams } from '@angular/common/http';

export class GangerSkillUpRequest {
    public gangerId: string;
    public advancementId: string;
    public skillCategory: string;

    public constructor(partial: Partial<GangerSkillUpRequest>) {
        if (partial.gangerId) {
            this.gangerId = partial.gangerId;
        }
        if (partial.advancementId) {
            this.advancementId = partial.advancementId;
        }
        if (partial.skillCategory) {
            this.skillCategory = partial.skillCategory;
        }
    }

    public toHttpParams(): HttpParams {
        let params = new HttpParams();
        let properties = [];
        if (this.gangerId) {
            properties.push('gangerId');
        }
        if (this.advancementId) {
            properties.push('advancementId');
        }
        if (this.skillCategory) {
            properties.push('skillCategory');
        }

        properties.forEach(prop => {
            params = params.set(prop, this[prop]);
        });

        return params;
    }
}