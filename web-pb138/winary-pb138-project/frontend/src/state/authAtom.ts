import { atom } from 'jotai';
import { User } from '../models/user';

export const whoAmIAtom = atom<User | null>(null);
