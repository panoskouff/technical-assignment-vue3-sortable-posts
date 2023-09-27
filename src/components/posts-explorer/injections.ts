import { InjectionKey } from 'vue';

export type SwapPostType = (direction: 'up' | 'down', index: number) => void;

export const SwapPostInjectKey: InjectionKey<SwapPostType> = Symbol();

export type TimeTravelType = (index: number) => void;

export const TimeTravelInjectKey: InjectionKey<TimeTravelType> = Symbol();
