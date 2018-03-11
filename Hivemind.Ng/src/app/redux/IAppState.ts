import { User } from './../../autogenerated/entities/User';
import { Gang } from './../../autogenerated/entities/Gang';
import { Weapon } from '../../autogenerated/entities/Weapon';

export interface IAppState {
    user: User;
    gang: Gang;
    token: string;
    weapons: Weapon[];
    inGame: boolean;
}
